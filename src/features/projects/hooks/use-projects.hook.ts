import type {
  CreateVersionType,
  ProjectType,
} from "@/features/projects/validation/projects.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export default function useProjects() {
  const createProjectMutation = useToastMutation({
    mutationFn: async (payload: ProjectType) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return payload;
    },
    loadingMessage: "Creating project...",
    successMessage: "Project created successfully!",
    errorMessage: "Unable to create project.",
  });

  const updateProjectMutation = useToastMutation({
    mutationFn: async () => {},
    loadingMessage: "Updating project...",
    successMessage: "Project updated successfully!",
    errorMessage: "Unable to update project.",
  });

  const deleteProjectMutation = useToastMutation({
    mutationFn: async () => {},
    loadingMessage: "Deleting project...",
    successMessage: "Project deleted successfully!",
    errorMessage: "Unable to delete project.",
  });

  const createVersionMutation = useToastMutation({
    mutationFn: async (payload: CreateVersionType) => {},
    loadingMessage: "Creating version...",
    successMessage: "Version created successfully!",
    errorMessage: "Unable to create version.",
  });

  return {
    createProjectMutation,
    createVersionMutation,
  };
}
