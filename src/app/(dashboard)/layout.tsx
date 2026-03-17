import type { ReactNode } from "react";
import { DialogManagerRenderer } from "@/features/shared/dialog-manager/dialog-manager-renderer";
import { DashboardSidebar } from "@/features/shared/navigation/dashboard/dashboard-sidebar";
import { DashboardLayout } from "@/features/shared/ui/dashboard-layout";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <DashboardLayout>
          {children}
          <DialogManagerRenderer />
        </DashboardLayout>
      </div>
    </main>
  );
}
