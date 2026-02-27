import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email().nonempty({ message: "Email is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
