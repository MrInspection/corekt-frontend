"use server";

import {
  ImportUserStoriesSchema,
  TaigaLoginFormSchema,
  type UserStory,
} from "@/features/taiga/validator/taiga.schema";
import { authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const taigaLoginAction = authAction
  .inputSchema(TaigaLoginFormSchema)
  .action(async ({ parsedInput: payload }) => {
    return await upfetchServer("/taiga/login", {
      method: "POST",
      body: payload,
    });
  });

export const getTaigaProjectsAction = authAction.action(async () => {
  return await upfetchServer<Record<string, string>>("/taiga/projects", {
    method: "GET",
  });
});

export const importUserStoriesAction = authAction
  .inputSchema(ImportUserStoriesSchema)
  .action(async ({ parsedInput: { projectId, taigaProjectId, versionId } }) => {
    return await upfetchServer<{ userStories: UserStory[] }>(
      `/projects/${projectId}/versions/${versionId}/taiga/user-stories?taigaProjectId=${taigaProjectId}`,
      {
        method: "GET",
      },
    );
  });
