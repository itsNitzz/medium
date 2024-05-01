import z from "zod";

export const userDataSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string().optional(),
});

export type SignupType = z.infer<typeof userDataSchema>;

export const signinInput = z.object({
  email: z.string(),
  password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type createPostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type updatePostType = z.infer<typeof updatePostInput>;
