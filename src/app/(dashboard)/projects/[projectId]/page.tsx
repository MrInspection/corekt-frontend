import { ProjectVersionsView } from "@/features/projects/views/versions/project-versions.view";

type PageParams = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function RoutePage(props: PageParams) {
  const { projectId } = await props.params;
  return <ProjectVersionsView projectId={projectId} />;
}
