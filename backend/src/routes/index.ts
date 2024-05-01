import { Hono } from "hono";
import user from "./user";
import blogsRoute from "./blogs";
import { verify } from "hono/jwt";

const mainRoutes = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string };
}>();

mainRoutes.use("blog/*", async (c, next) => {
  const jwt = c.req.header("Authorization") as string;
  if (!jwt) {
    c.status(401);
    return c.json({ message: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ message: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next();
});

mainRoutes.route("/user", user);
mainRoutes.route("/blog", blogsRoute);

export default mainRoutes;
