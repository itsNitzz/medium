import { Hono } from "hono";
import mainRoutes from "./routes";

const app = new Hono();

app.route("/api/v1", mainRoutes);

export default app;
