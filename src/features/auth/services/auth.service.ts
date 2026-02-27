import type { Account, User } from "@/features/auth/types/auth.type";
import type { LoginType } from "@/features/auth/validation/auth.schema";
import { upfetch } from "@/lib/up-fetch";

export const loginUser = async (payload: LoginType) => {
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
