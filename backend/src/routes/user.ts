import { Hono } from "hono";

const user = new Hono();

user.post("/signin", (c): any => {
  console.log(c);
});

user.post("/signup", (c): any => {
  console.log(c);
});

export default user;
