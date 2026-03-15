import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useProjects(userId?: string) {
  const queryClient = useQueryClient();

  const getProjects = useQuery({
    queryKey: projectsQueryKey(userId ?? ""),
    queryFn: async () => {
      return await getProjectsAction().then((res) => res.data);
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const createProjectMutation = useToastMutation({
    mutationFn: async (payload: ProjectForm) => {
      return await createProjectAction(payload).then((res) => res.data);
    },
    loadingMessage: "Creating project...",
    successMessage: "Project created successfully!",
    errorMessage: "Unable to create project.",
    options: {
      onSettled: () => {
        if (!userId) return;
        queryClient.invalidateQueries({
          queryKey: projectsQueryKey(userId),
          exact: true,
        });
      },
    },
  });

  const updateProjectMutation = useToastMutation({
    mutationFn: async (payload: ProjectForm & { id: string }) => {
      return await updateProjectAction(payload).then((res) => res?.data);
    },
    loadingMessage: "Updating project...",
    successMessage: "Project updated successfully!",
    errorMessage: "Unable to update project.",
    options: {
      onSettled: (_data, _error, { id: projectId }) => {
        if (!userId) return;
        queryClient.invalidateQueries({
          queryKey: projectQueryKey(userId, projectId),
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: projectsQueryKey(userId),
          exact: true,
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
      onSettled: (_data, _error, projectId) => {
        if (!userId) return;
        queryClient.removeQueries({
          queryKey: projectQueryKey(userId, projectId),
        });
        queryClient.invalidateQueries({
          queryKey: projectsQueryKey(userId),
          exact: true,
        });
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

export function useProject(projectId: string, userId?: string) {
  return useQuery({
    queryKey: projectQueryKey(userId ?? "", projectId),
    queryFn: async () => {
      return await getProjectAction({ id: projectId }).then((res) => res?.data);
    },
    enabled: !!userId && !!projectId,
  });
}
