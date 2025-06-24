import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlog, updateBlog} from "@thisispranav/the-extreme-blog-common";
import { title } from "process";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

bookRouter.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

bookRouter.use("/blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ message: "You are not logged in." });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }
  c.set("userId", payload.id as string);
  await next();
});

bookRouter.post("//post", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const {success} = createBlog.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }

  try{
    const post = await prisma.post.create({
    data:{
      title: body.title,
      content: body.title,
      authorId: userId
    }
    })
    return c.json({
      message: "post uploaded successfully",
      id: post.id
    })
  } catch(e){
    return c.json({
      error:"Error while uploading the posdt"
    })
  }

});


bookRouter.put("/blog/update/:id", async(c)=>{
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const body = await c.req.json();
  body.id = userId  
  const {success} = updateBlog.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Input not correct"
    })
  }


  const id = c.req.param("id");

  try{
    await prisma.post.update({
    where:{
      id: id,
      authorId: userId
    },
    data:{
      title: body.title,
      content: body.content
    }
    })
	  return c.text('updated post');
  } catch(e){
    return c.text('error while updating');
  }
})


bookRouter.get('/blog/oneBlog/:id', async(C)=>{
  const id = C.req.param("id");
  const prisma = C.get("prisma");

  const post = await prisma.post.findUnique({
    where:{
      id
    }
  })

  if (!post){
    return C.json({
      message: "post does not exist"
    })
  }

  return C.json(post)
})

bookRouter.get('/blog/bulk', async(C)=>{
  const prisma = C.get("prisma");

  const posts = await prisma.post.findMany({
    select:{
      title: true,
      content: true,
      id: true,
      authorId:true,
      author: {
        select: {
          name: true
        }
      }
    }
  })

  return C.json(posts)
})

