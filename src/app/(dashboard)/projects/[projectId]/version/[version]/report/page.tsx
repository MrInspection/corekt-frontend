import { ProjectReportView } from "@/features/projects/views/reports/project-report.view";

type PageParams = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function RoutePage(props: PageParams) {
  const params = await props.params;
  return <ProjectReportView />;
}
