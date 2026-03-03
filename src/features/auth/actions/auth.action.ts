"use server";

import { loginUser } from "@/features/auth/services/auth.service";
import { LoginSchema } from "@/features/auth/validation/auth.schema";
import { deleteSessionToken, setSessionToken } from "@/lib/auth-session";
import { actionClient, authAction } from "@/lib/safe-actions";

export const signInAction = actionClient
  .inputSchema(LoginSchema)
  .action(async ({ parsedInput: payload }) => {
    const account = await loginUser(payload);
    await setSessionToken(account.token);
  });

export const signOutAction = actionClient.action(async () => {
  return await deleteSessionToken();
});

export const getCurrentUserAction = authAction.action(async ({ ctx: user }) => {
  return user;
});
