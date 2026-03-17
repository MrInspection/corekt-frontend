import type { ReactNode } from "react";
import { SettingsSidebar } from "@/features/shared/navigation/settings/settings-sidebar";
import { DashboardLayout } from "@/features/shared/ui/dashboard-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen flex-col bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        <SettingsSidebar />
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </main>
  );
}
