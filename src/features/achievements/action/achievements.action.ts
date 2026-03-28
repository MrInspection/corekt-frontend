"use server";

import type {
  Achievement,
  UnlockedAchievement,
} from "@/features/achievements/types/achievements.types";
import { authAction } from "@/lib/safe-actions";
import { upfetchServer } from "@/lib/up-fetch/up-fetch-server";

export const getAchievements = authAction.action(async () => {
  return await upfetchServer<Achievement[]>("/achievements", { method: "GET" });
});

export const getUnlockedAchievements = authAction.action(async () => {
  return await upfetchServer<UnlockedAchievement[]>("/achievements/me", {
    method: "GET",
  });
});
