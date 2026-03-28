import { useQuery } from "@tanstack/react-query";
import {
  getAchievements,
  getUnlockedAchievements,
} from "@/features/achievements/action/achievements.action";

export const achievementsQueryKey = ["achievements"] as const;

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      return await getAchievements().then((res) => res.data);
    },
  });
}

export function useUnlockedAchievements() {
  return useQuery({
    queryKey: ["achievements", "unlocked"],
    queryFn: async () => {
      return await getUnlockedAchievements().then((res) => res.data);
    },
  });
}
