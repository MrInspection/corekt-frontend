"use server";

import z from "zod";
import { loginUser } from "@/features/auth/services/auth.service";
import { LoginFormSchema } from "@/features/auth/validation/auth.schema";
import { deleteSessionToken, setSessionToken } from "@/lib/auth-session";
import { actionClient, authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const signInAction = actionClient
  .inputSchema(LoginFormSchema)
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

export const saveApiKeyAction = authAction
  .inputSchema(
    z.object({
      encryptedApiKey: z.string(),
      encryptedDataKey: z.string(),
      initializationVector: z.string(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    return await upfetchServer("/user/me/api-key", {
      method: "POST",
      body: payload,
    });
  });

export const deleteAccountAction = authAction.action(async ({ ctx: user }) => {
  await upfetchServer(`/user/${user.id}`, {
    method: "DELETE",
  });
  return await deleteSessionToken();
});
