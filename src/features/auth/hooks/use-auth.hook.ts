import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  deleteAccountAction,
  getCurrentUserAction,
  saveApiKeyAction,
  signInAction,
  signOutAction,
} from "@/features/auth/actions/auth.action";
import type { LoginForm } from "@/features/auth/validation/auth.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";
import { encryptApiKey } from "@/lib/api-key-encryption";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const result = await getCurrentUserAction();
      if (!result.data) return null;
      return result.data;
    },
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  const loginMutation = useToastMutation({
    mutationFn: async (payload: LoginForm) => await signInAction(payload),
    loadingMessage: "Logging in...",
    successMessage: "You are now logged in.",
    errorMessage: "An error occurred while logging in.",
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["user", "me"] });
        router.push("/dashboard");
      },
    },
  });

  const logoutMutation = useToastMutation({
    mutationFn: () => signOutAction(),
    loadingMessage: "Logging out...",
    successMessage: "You are now logged out.",
    errorMessage: "An error occurred while logging out.",
    options: {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["user", "me"] });
        router.push("/");
      },
    },
  });

  const saveApiKeyMutation = useToastMutation({
    mutationFn: async (plaintextApiKey: string) => {
      const base64PublicKey = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY;
      if (!base64PublicKey) {
        throw new Error("Missing NEXT_PUBLIC_RSA_PUBLIC_KEY");
      }

      const encrypted = await encryptApiKey(plaintextApiKey, base64PublicKey);
      return await saveApiKeyAction(encrypted);
    },
    loadingMessage: "Saving API key...",
    successMessage: "API key saved.",
    errorMessage: "Failed to save API key.",
  });

  const deleteAccountMutation = useToastMutation({
    mutationFn: async () => await deleteAccountAction(),
    loadingMessage: "Deleting account...",
    errorMessage: "An error occured while deleting your account.",
    successMessage: "Your account has been deleted.",
    options: {
      onSuccess: async () => {
        await queryClient.removeQueries({ queryKey: ["user", "me"] });
        router.push("/");
      },
    },
  });

  return {
    currentUser,
    userId: currentUser?.id,
    saveApiKeyMutation,
    loginMutation,
    logoutMutation,
    deleteAccountMutation,
  };
}
