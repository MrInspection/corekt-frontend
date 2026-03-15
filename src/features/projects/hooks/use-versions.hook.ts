import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVersionAction,
  deleteVersionAction,
  getVersionAction,
  getVersionsAction,
  updateVersionAction,
} from "@/features/projects/actions/versions.action";
import type { VersionForm } from "@/features/projects/validation/versions.schema";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export const versionsQueryKey = (projectId: string) =>
  ["projects", projectId, "versions"] as const;

export const versionQueryKey = (projectId: string, versionId: string) =>
  ["projects", projectId, "versions", versionId] as const;

export function useVersions({ projectId }: { projectId?: string } = {}) {
  const queryClient = useQueryClient();

  const getVersions = useQuery({
    queryKey: versionsQueryKey(projectId ?? ""),
    queryFn: async () =>
      await getVersionsAction({ projectId: projectId! }).then(
        (res) => res?.data,
      ),
    enabled: !!projectId,
    placeholderData: (previousData) => previousData,
  });

  const createVersionMutation = useToastMutation({
    mutationFn: async (payload: VersionForm) => {
      if (!projectId) return;
      return await createVersionAction({ ...payload, projectId }).then(
        (res) => res?.data,
      );
    },
    loadingMessage: "Creating version...",
    successMessage: "Version created successfully!",
    errorMessage: "Unable to create version.",
    options: {
      onSettled: () => {
        if (!projectId) return;
        queryClient.invalidateQueries({
          queryKey: versionsQueryKey(projectId),
          exact: true,
        });
      },
    },
  });

  const updateVersionMutation = useToastMutation({
    mutationFn: async (payload: VersionForm & { versionId: string }) => {
      if (!projectId) return;
      return await updateVersionAction({ ...payload, projectId }).then(
        (res) => res?.data,
      );
    },
    loadingMessage: "Updating version...",
    successMessage: "Version updated successfully!",
    errorMessage: "Unable to update version.",
    options: {
      onSettled: (_data, _error, { versionId }) => {
        if (!projectId) return;
        queryClient.invalidateQueries({
          queryKey: versionQueryKey(projectId, versionId),
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: versionsQueryKey(projectId),
          exact: true,
        });
      },
    },
  });

  const deleteVersionMutation = useToastMutation({
    mutationFn: async (versionId: string) => {
      if (!projectId) return;
      return await deleteVersionAction({ versionId, projectId }).then(
        (res) => res?.data,
      );
    },
    loadingMessage: "Deleting version...",
    successMessage: "Version deleted successfully!",
    errorMessage: "Unable to delete version.",
    options: {
      onSettled: (_data, _error, versionId) => {
        if (!projectId) return;
        queryClient.removeQueries({
          queryKey: versionQueryKey(projectId, versionId),
        });
        queryClient.invalidateQueries({
          queryKey: versionsQueryKey(projectId),
          exact: true,
        });
      },
    },
  });

  return {
    getVersions,
    createVersionMutation,
    updateVersionMutation,
    deleteVersionMutation,
  };
}

export function useVersion({
  projectId,
  versionId,
}: {
  projectId: string;
  versionId: string;
}) {
  return useQuery({
    queryKey: versionQueryKey(projectId, versionId),
    queryFn: async () =>
      await getVersionAction({ projectId, versionId }).then((res) => res?.data),
    enabled: !!projectId && !!versionId,
  });
}
