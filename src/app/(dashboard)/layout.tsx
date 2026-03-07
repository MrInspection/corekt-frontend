import type { ReactNode } from "react";
import { DialogManagerRenderer } from "@/features/shared/dialog-manager/dialog-manager-renderer";
import { DashboardLayout } from "@/features/shared/ui/layouts/dashboard-layout";
import { DashboardSidebar } from "@/features/shared/ui/layouts/dashboard-sidebar";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col bg-gray-50">
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
