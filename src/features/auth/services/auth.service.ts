import { saveApiKeyAction } from "@/features/auth/actions/auth.action";
import type {
  Account,
  LoginForm,
  User,
} from "@/features/auth/validation/auth.schema";
import { encryptApiKey } from "@/lib/api-key-encryption";
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

export const saveApiKey = async (plaintextApiKey: string) => {
  const base64PublicKey = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY!;
  const encrypted = await encryptApiKey(plaintextApiKey, base64PublicKey);
  return await saveApiKeyAction(encrypted);
};
