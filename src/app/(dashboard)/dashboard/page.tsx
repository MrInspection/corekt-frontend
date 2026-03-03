import type { Metadata } from "next";
import { ProjectsDashboardView } from "@/features/projects/views/projects-dashboard.view";

export const metadata: Metadata = {
  title: "Dashboard - Corekt",
};

export default function DashboardPage() {
  return <ProjectsDashboardView />;
}
