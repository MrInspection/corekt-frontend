import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDatalinkAction,
  getIssuesAction,
} from "@/features/projects/actions/issues.action";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";

export function useVersionIssues({
  projectId,
  versionId,
}: {
  projectId: string;
  versionId: string;
}) {
  const queryClient = useQueryClient();

  const getIssues = useQuery({
    queryKey: ["issues", projectId, versionId],
    queryFn: async () => {
      return await getIssuesAction({ projectId, versionId }).then(
        (res) => res?.data,
      );
    },
    enabled: !!projectId && !!versionId,
  });

  const deleteDatalink = useToastMutation({
    mutationFn: async (datalinkId: string) => {
      return await deleteDatalinkAction({
        versionId,
        projectId,
        datalinkId,
      }).then((res) => res?.data);
    },
    loadingMessage: "Deleting issue...",
    successMessage: "Issue removed successfully!",
    errorMessage: "Unable to delete issue.",
    options: {
      onSettled: (_data, _error, _) => {
        if (!versionId) return;
        queryClient.invalidateQueries({
          queryKey: ["issues", projectId, versionId],
        });
      },
    },
  });

  return {
    getIssues,
    deleteDatalink,
  };
}
