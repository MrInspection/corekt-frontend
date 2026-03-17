import { SettingsMobileSheet } from "@/features/shared/navigation/settings/settings-mobile-sheet";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";

export default function AchievementsPage() {
  return (
    <>
      <DashboardHeader className="md:hidden">
        <SettingsMobileSheet />
      </DashboardHeader>
      <DashboardContent></DashboardContent>
    </>
  );
}
