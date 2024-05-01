import { Hono } from "hono";
import { userDataSchema, signinInput } from "iamnitzz-common-module";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const user = new Hono<{ Bindings: { DATABASE_URL: string; JWT_SECRET: string } }>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = userDataSchema.safeParse(body);
  if (!success) {
    return c.json(
      { message: "Incorrect user input" },
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.create({
      data: body,
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: jwt });
  } catch (e) {
    return c.json(
      {
        message: "An error occured please try again",
      },
      { status: 403 }
    );
  }
});

user.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json(
      { message: "Incorrect user input" },
      {
        status: 400,
      }
    );
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ message: "user not found." });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ token });
});

export default user;
