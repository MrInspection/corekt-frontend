"use client";

import { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AchievementCard } from "@/features/achievements/components/achievement-card";
import { AchievementLoadingState } from "@/features/achievements/components/achievement-loading-state";
import {
  useAchievements,
  useUnlockedAchievements,
} from "@/features/achievements/hooks/use-achievements.hook";
import { SettingsMobileSheet } from "@/features/shared/navigation/settings/settings-mobile-sheet";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";

export type EnrichedAchievement = {
  id: string;
  name: string;
  description: string;
  hidden: boolean;
  isUnlocked: boolean;
  acquiredAt: string | null;
};

export function AchievementsView() {
  const getAchievements = useAchievements();
  const getUnlockedAchievements = useUnlockedAchievements();

  const isPending =
    getAchievements.isPending || getUnlockedAchievements.isPending;

  const enrichedAchievements = useMemo<EnrichedAchievement[]>(() => {
    const achievements = getAchievements.data ?? [];
    const unlockedAchievements = getUnlockedAchievements.data ?? [];

    const unlockedById = new Map(
      unlockedAchievements.map((u) => [u.id, u.acquiredAt]),
    );

    return achievements.map((achievement) => ({
      ...achievement,
      isUnlocked: unlockedById.has(achievement.id),
      acquiredAt: unlockedById.get(achievement.id) ?? null,
    }));
  }, [getAchievements.data, getUnlockedAchievements.data]);

  return (
    <>
      <DashboardHeader className="md:hidden">
        <SettingsMobileSheet />
      </DashboardHeader>
      <DashboardContent className="py-16">
        <div className="container max-w-2xl">
          <h3 className="px-4 font-medium text-2xl">My Achievements</h3>
          <p className="mt-0.5 px-4 text-muted-foreground text-sm">
            Track your progress and milestones as you use the platform.
          </p>
          <div className="mt-8">
            <Accordion className="grid gap-4">
              {isPending ? (
                <AchievementLoadingState />
              ) : (
                enrichedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} {...achievement} />
                ))
              )}
            </Accordion>
          </div>
        </div>
      </DashboardContent>
    </>
  );
}
