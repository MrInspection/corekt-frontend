import { useState } from "react";
import { useToastMutation } from "@/features/shared/toast-mutation/use-toast-mutation";
import {
  getTaigaProjectsAction,
  importUserStoriesAction,
  taigaLoginAction,
} from "@/features/taiga/actions/taiga.action";
import type {
  ImportUserStories,
  TaigaLoginForm,
  TaigaProject,
  UserStory,
} from "@/features/taiga/validator/taiga.schema";

export function useTaiga() {
  const [taigaProjects, setTaigaProjects] = useState<TaigaProject[]>([]);
  const [importedUserStories, setImportedUserStories] = useState<UserStory[]>(
    [],
  );

  const loginMutation = useToastMutation({
    mutationFn: async (payload: TaigaLoginForm) => {
      await taigaLoginAction(payload);
      const result = await getTaigaProjectsAction();
      const projects = Object.entries(result?.data?.projects ?? {}).map(
        ([name, id]) => ({ name, id }),
      );
      setTaigaProjects(projects);
      return projects;
    },
    loadingMessage: "Connecting to Taiga...",
    successMessage: "Connected to Taiga!",
    errorMessage: "Failed to connect to Taiga.",
  });

  const importMutation = useToastMutation({
    mutationFn: async (payload: ImportUserStories) => {
      const result = await importUserStoriesAction(payload);
      const stories = result?.data?.userStories ?? [];
      setImportedUserStories(stories);
      return stories;
    },
    loadingMessage: "Importing user stories...",
    successMessage: "User stories imported successfully!",
    errorMessage: "Failed to import user stories.",
  });

  return {
    taigaProjects,
    importedUserStories,
    loginMutation,
    importMutation,
  };
}
