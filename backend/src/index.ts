import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { bookRouter } from "./routes/bookRouter";
import {cors} from"hono/cors";

export const app = new Hono();

app.use("/*", cors())
app.route("/api/v1/user", userRouter);
app.route("api/v1/book", bookRouter);


export default app