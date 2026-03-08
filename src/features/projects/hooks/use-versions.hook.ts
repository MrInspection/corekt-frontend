import type { CreateVersion } from "@/features/projects/validation/projects.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export function useVersions() {
  const createVersionMutation = useToastMutation({
    mutationFn: async (payload: CreateVersion) => {},
    loadingMessage: "Creating version...",
    successMessage: "Version created successfully!",
    errorMessage: "Unable to create version.",
  });

  return {
    createVersionMutation,
  };
}
