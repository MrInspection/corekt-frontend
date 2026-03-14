import z from "zod";

export const TaigaLoginFormSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export type TaigaLoginForm = z.infer<typeof TaigaLoginFormSchema>;

export const TaigaProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TaigaProject = z.infer<typeof TaigaProjectSchema>;

export const UserStorySchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type UserStory = z.infer<typeof UserStorySchema>;

export const ImportUserStoriesSchema = z.object({
  projectId: z.uuid(),
  versionId: z.uuid(),
  taigaProjectId: z.string().nonempty(),
});

export type ImportUserStories = z.infer<typeof ImportUserStoriesSchema>;
