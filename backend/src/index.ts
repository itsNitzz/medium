import { Hono } from "hono";
import { cors } from "hono/cors";

import mainRoutes from "./routes";

const app = new Hono();

app.use("/api/*", cors());

app.route("/api/v1", mainRoutes);

export default app;
