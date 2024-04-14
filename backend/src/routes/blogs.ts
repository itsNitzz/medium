import { Hono } from "hono";

const blogsRoute = new Hono();

blogsRoute.post("/");
blogsRoute.put("/");
blogsRoute.get("/:id");
blogsRoute.post("/bulk");

export default blogsRoute;
