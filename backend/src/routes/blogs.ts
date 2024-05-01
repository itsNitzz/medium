import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

const blogsRoute = new Hono<{ Variables: { userId: string }; Bindings: { DATABASE_URL: string } }>();

blogsRoute.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: { ...body, authorId: userId, published: true },
  });

  return c.json({ id: post.id });
});

blogsRoute.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  await prisma.post.update({
    data: { title: body.title, content: body.content },
    where: {
      id: body.id,
      authorId: userId,
    },
  });

  return c.text("post updated successfully!");
});

blogsRoute.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany();
    console.log("posts", posts);

    return c.json(posts);
  } catch (e) {
    console.log(e);
  }
});

blogsRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return c.json(post);
});

export default blogsRoute;
