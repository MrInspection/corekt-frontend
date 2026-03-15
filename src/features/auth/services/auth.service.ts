import type {
  Account,
  LoginForm,
  User,
} from "@/features/auth/validation/auth.schema";
import { upfetch } from "@/lib/up-fetch/up-fetch";

export const loginUser = async (payload: LoginForm) => {
  return await upfetch<Account>("/auth/login", {
    method: "POST",
    body: {
      ...payload,
    },
  });
};

export const getCurrentUser = async (token: string) => {
  return await upfetch<User>("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};