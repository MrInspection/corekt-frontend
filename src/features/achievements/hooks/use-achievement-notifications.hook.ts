import { useQueryClient } from "@tanstack/react-query";
import { getAchievements } from "@/features/achievements/action/achievements.action";
import { showAchievementToast } from "@/features/achievements/components/achievement-toast";
import { achievementsQueryKey } from "@/features/achievements/hooks/use-achievements.hook";

export function useAchievementNotifications() {
  const queryClient = useQueryClient();

  const notify = async (unlockedAchievementIds: string[]) => {
    if (unlockedAchievementIds.length === 0) return;

    const achievements = await queryClient.fetchQuery({
      queryKey: achievementsQueryKey,
      queryFn: async () => {
        return await getAchievements().then((res) => res.data);
      },
    });

    unlockedAchievementIds.forEach((achievementId) => {
      const achievement = achievements?.find((a) => a.id === achievementId);
      if (!achievement) return;

      showAchievementToast({
        name: achievement.name,
        description: achievement.description,
      });
    });
  };

  return { notify };
}
