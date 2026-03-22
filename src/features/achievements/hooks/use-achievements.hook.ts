import { useQuery } from "@tanstack/react-query";
import { getAchievements } from "@/features/achievements/action/achievements.action";

export const achievementsQueryKey = ["achievements"] as const;

export function useAchievements() {
  return useQuery({
    queryKey: achievementsQueryKey,
    queryFn: async () => {
      return await getAchievements().then((res) => res.data);
    },
  });
}
