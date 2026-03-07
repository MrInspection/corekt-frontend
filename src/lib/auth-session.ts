import { cookies } from "next/headers";
import { unauthorized } from "next/navigation";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import type { User } from "@/features/auth/types/auth.type";

export const SESSION_COOKIE_NAME = "corekt-auth-token";

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export const setSessionToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
};

export const getSessionToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
};

export const deleteSessionToken = async () => {
  console.log("deleteSessionToken called");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    ...SESSION_COOKIE_OPTIONS,
    maxAge: 0,
    expires: new Date(0),
  });
  console.log("cookie deleted");
};

export const getUser = async () => {
  const token = await getSessionToken();
  if (!token) return null;

  return ((await getCurrentUser(token)) as User) ?? null;
};

export const getRequiredUser = async () => {
  const user = await getUser();
  if (!user) unauthorized();
  return user;
};
