import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/use-auth.hook";
import {
  createProjectAction,
  deleteProjectAction,
  getProjectAction,
  getProjectsAction,
  updateProjectAction,
} from "@/features/projects/actions/projects.action";
import type { ProjectForm } from "@/features/projects/validation/projects.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export const projectsQueryKey = (userId: string) =>
  ["projects", userId] as const;
export const projectQueryKey = (userId: string, projectId: string) =>
  ["projects", userId, projectId] as const;

export function useProjects() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const getProjects = useQuery({
    queryKey: projectsQueryKey(userId ?? ""),
    queryFn: async () => {
      return await getProjectsAction().then((res) => res.data);
    },
    enabled: !!userId,
  });

  const createProjectMutation = useToastMutation({
    mutationFn: async (payload: ProjectForm) => {
      return await createProjectAction(payload).then((res) => res.data);
    },
    loadingMessage: "Creating project...",
    successMessage: "Project created successfully!",
    errorMessage: "Unable to create project.",
    options: {
      onSuccess: () => {
        if (!userId) return;
        queryClient.invalidateQueries({ queryKey: projectsQueryKey(userId) });
      },
    },
  });

  const updateProjectMutation = useToastMutation({
    mutationFn: async (payload: ProjectForm & { id: string }) => {
      console.log("updateProjectAction payload", payload);
      const res = await updateProjectAction(payload);
      console.log("updateProjectAction res", res);
      return res?.data;
    },
    loadingMessage: "Updating project...",
    successMessage: "Project updated successfully!",
    errorMessage: "Unable to update project.",
    options: {
      onSuccess: (_, { id: projectId }) => {
        if (!userId) return;
        queryClient.invalidateQueries({ queryKey: projectsQueryKey(userId) });
        queryClient.invalidateQueries({
          queryKey: projectQueryKey(userId, projectId),
        });
      },
    },
  });

  const deleteProjectMutation = useToastMutation({
    mutationFn: async (id: string) => {
      await deleteProjectAction({ id });
    },
    loadingMessage: "Deleting project...",
    successMessage: "Project deleted successfully!",
    errorMessage: "Unable to delete project.",
    options: {
      onSuccess: () => {
        if (!userId) return;
        queryClient.invalidateQueries({ queryKey: projectsQueryKey(userId) });
      },
    },
  });

  return {
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
    getProjects,
  };
}

export function useProject(projectId: string) {
  const { userId } = useAuth();

  return useQuery({
    queryKey: projectQueryKey(userId ?? "", projectId),
    queryFn: async () => {
      return await getProjectAction({ id: projectId }).then((res) => res?.data);
    },
    enabled: !!userId,
  });
}
