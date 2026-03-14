"use server";

import z from "zod";
import {
  type Version,
  VersionFormSchema,
} from "@/features/projects/validation/versions.schema";
import { authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const getVersionsAction = authAction
  .inputSchema(
    z.object({
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    const { projectId } = payload;
    return await upfetchServer<Version[]>(`/projects/${projectId}/versions`, {
      method: "GET",
    });
  });

export const getVersionAction = authAction
  .inputSchema(z.object({ versionId: z.uuid(), projectId: z.uuid() }))
  .action(async ({ parsedInput: payload }) => {
    const { versionId, projectId } = payload;
    return await upfetchServer<Version>(
      `/projects/${projectId}/versions/${versionId}`,
      {
        method: "GET",
      },
    );
  });

export const createVersionAction = authAction
  .inputSchema(
    VersionFormSchema.extend({
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    return await upfetchServer<Version>(
      `/projects/${payload.projectId}/versions`,
      {
        method: "POST",
        body: {
          title: payload.title,
        },
      },
    );
  });

export const updateVersionAction = authAction
  .inputSchema(
    VersionFormSchema.extend({
      versionId: z.uuid(),
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: { versionId, projectId, title } }) => {
    return await upfetchServer<Version>(
      `/projects/${projectId}/versions/${versionId}`,
      {
        method: "PATCH",
        body: {
          title,
        },
      },
    );
  });

export const deleteVersionAction = authAction
  .inputSchema(
    z.object({
      versionId: z.uuid(),
      projectId: z.uuid(),
    }),
  )
  .action(async ({ parsedInput: payload }) => {
    const { versionId, projectId } = payload;
    return await upfetchServer(`/projects/${projectId}/versions/${versionId}`, {
      method: "DELETE",
    });
  });
