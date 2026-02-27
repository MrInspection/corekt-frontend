import { createSafeActionClient } from "next-safe-action";
import { getRequiredUser } from "@/lib/auth-session";

class SafeActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (error: Error) => {
    if (error instanceof SafeActionError) {
      return error.message;
    }
    return "An unexpected error occurred";
  },
});

export const authAction = actionClient.use(async ({ next }) => {
  const user = await getRequiredUser();
  return next({ ctx: user });
});
