import { FolderIcon, SearchIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";
import { Icons } from "@/features/shared/ui/icons";
import { useTaiga } from "@/features/taiga/hooks/use-taiga.hook";
import type {
  TaigaProject,
  UserStory,
} from "@/features/taiga/validator/taiga.schema";

type SelectTaigaProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: TaigaProject[];
  onImported: (userStories: UserStory[]) => void;
};

export function SelectTaigaProjectDialog({
  open,
  onOpenChange,
  projects,
  onImported,
}: SelectTaigaProjectDialogProps) {
  const { projectId, version } = useParams<{
    projectId: string;
    version: string;
  }>();
  const { importMutation } = useTaiga();
  const [search, setSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const visibleProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleImport = () => {
    if (!selectedProjectId) return;
    importMutation.mutate(
      { projectId, versionId: version, taigaProjectId: selectedProjectId },
      {
        onSuccess: (stories) => {
          onImported(stories ?? []);
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[72svh] flex-col gap-0 p-0 md:min-w-110">
        <DialogHeader className="gap-0.5 border-b p-6">
          <DialogTitle className="text-base">Import User Stories</DialogTitle>
          <DialogDescription className="text-pretty">
            Select the project you want to import user stories from.
          </DialogDescription>
        </DialogHeader>
        <div className="border-b bg-gray-50 px-6 py-3">
          <InputGroup className="bg-background">
            <InputGroupInput
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid h-full divide-y overflow-y-scroll">
          {visibleProjects.length === 0 ? (
            <EmptyState className="flex items-center justify-center">
              <EmptyStateIcon icon={FolderIcon} />
              <EmptyStateTitle>No Taiga Projects</EmptyStateTitle>
              <EmptyStateDescription className="text-pretty text-center">
                You don't have any Taiga projects to import user stories from.
              </EmptyStateDescription>
            </EmptyState>
          ) : (
            visibleProjects.map((project) => (
              <section
                key={project.id}
                className="flex items-center gap-4 px-6 py-4"
                data-selected={selectedProjectId === project.id || undefined}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded border">
                  <Icons.taiga className="size-6" />
                </div>
                <p className="line-clamp-1 max-w-prose font-medium">
                  {project.name}
                </p>
                <Button
                  className="ml-auto"
                  variant={
                    selectedProjectId === project.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {selectedProjectId === project.id ? "Selected" : "Select"}
                </Button>
              </section>
            ))
          )}
        </div>
        <DialogFooter className="mt-auto border-t p-6 py-5">
          <Button
            className="w-full"
            disabled={!selectedProjectId || importMutation.isPending}
            isLoading={importMutation.isPending}
            isLoadingText="Importing..."
            onClick={handleImport}
          >
            Import User Stories
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
