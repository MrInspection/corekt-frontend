import type { Metadata } from "next";
import { AchievementsView } from "@/features/achievements/views/achievements.view";

export const metadata: Metadata = {
  title: "Achievements - Corekt",
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
