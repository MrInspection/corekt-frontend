"use server";

import { up } from "up-fetch";
import { getSessionToken } from "@/lib/auth-session";

export const upfetchServer = up(fetch, async () => {
  const token = await getSessionToken();
  return {
    baseUrl: process.env.COREKT_BACKEND_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});
