import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  username: z.string(),
  mistralToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const AccountSchema = z.object({
  token: z.string(),
  expiresAt: z.number(),
  user: UserSchema,
});

export type Account = z.infer<typeof AccountSchema>;

export const LoginFormSchema = z.object({
  email: z.email().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
