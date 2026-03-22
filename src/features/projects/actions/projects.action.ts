"use server";

import z from "zod";
import {
  type Project,
  ProjectFormSchema,
} from "@/features/projects/validation/projects.schema";
import { authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const getProjectsAction = authAction.action(async () => {
  return await upfetchServer<Project[]>("/projects", {
    method: "GET",
  });
});

export const getProjectAction = authAction
  .inputSchema(z.object({ id: z.uuid() }))
  .action(async ({ parsedInput: payload }) => {
    return await upfetchServer<Project>(`/projects/${payload.id}`, {
      method: "GET",
    });
  });

export const createProjectAction = authAction
  .inputSchema(ProjectFormSchema)
  .action(async ({ parsedInput: payload }) => {
    return await upfetchServer<{
      project: Project;
      unlockedAchievementIds: string[];
    }>("/projects", {
      method: "POST",
      body: payload,
      parseResponse: async (res) => {
        const project = await res.json();
        const header = res.headers.get("X-Unlocked-Achievements") ?? "";
        const unlockedAchievementIds = header.split(",").filter(Boolean);
        return { project, unlockedAchievementIds };
      },
    });
  });

export const updateProjectAction = authAction
  .inputSchema(
    ProjectFormSchema.extend({
      id: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: { id: projectId, ...rest } }) => {
    return await upfetchServer<Project>(`/projects/${projectId}`, {
      method: "PATCH",
      body: rest,
    });
  });

export const deleteProjectAction = authAction
  .inputSchema(z.object({ id: z.uuid() }))
  .action(async ({ parsedInput: { id: projectId } }) => {
    return await upfetchServer(`/projects/${projectId}`, {
      method: "DELETE",
    });
  });
