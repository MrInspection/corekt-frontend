import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getCurrentUserAction,
  signInAction,
  signOutAction,
} from "@/features/auth/actions/auth.action";
import type { LoginType } from "@/features/auth/validation/auth.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      return await getCurrentUserAction().then((res) => res.data);
    },
  });

  const loginMutation = useToastMutation({
    mutationFn: async (payload: LoginType) => await signInAction(payload),
    loadingMessage: "Logging in...",
    successMessage: "You are now logged in.",
    errorMessage: "An error occurred while logging in.",
    options: {
      onSuccess: () => {
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

  return {
    currentUser,
    loginMutation,
    logoutMutation,
  };
}
