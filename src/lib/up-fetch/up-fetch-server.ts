"use server";

import { up } from "up-fetch";
import { getSessionToken } from "@/lib/auth-session";

export const upfetchServer = up(fetch, async () => {
  const token = await getSessionToken();
  return {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});
