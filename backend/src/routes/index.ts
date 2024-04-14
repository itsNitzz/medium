import { Hono } from "hono";
import user from "./user";
import blogsRoute from "./blogs";

const mainRoutes = new Hono();

mainRoutes.route("/user", user);
mainRoutes.route("/blog", blogsRoute);

export default mainRoutes;
