import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {signupInput, signinInput} from "@thisispranav/the-extreme-blog-common"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
  };
}>();

userRouter.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "User created successfully",
      token: token,
      name: user.name
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "User already exist or error while creating",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ message: "User not found" });
    }
    if (!user.password == body.password) {
      return c.json({ message: "Wrong password" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "signin successfull", token: token, name: user.name });
  } catch (e) {
    return c.json({ error: "Something went wrong" });
  }
});
