"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/features/shared/ui/icons";
import { ConnectTaigaDialog } from "@/features/taiga/components/connect-taiga-dialog";
import { SelectTaigaProjectDialog } from "@/features/taiga/components/select-taiga-project-dialog";
import type {
  TaigaProject,
  UserStory,
} from "@/features/taiga/validator/taiga.schema";

type ImportUserStoriesStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function ImportUserStoriesStep({
  onStart,
  onNext,
}: ImportUserStoriesStepProps) {
  const [taigaProjects, setTaigaProjects] = useState<TaigaProject[]>([]);
  const [importedUserStories, setImportedUserStories] = useState<UserStory[]>(
    [],
  );
  const [selectProjectOpen, setSelectProjectOpen] = useState(false);

  const handleConnected = (projects: TaigaProject[]) => {
    setTaigaProjects(projects);
    setSelectProjectOpen(true);
    onStart();
  };

  const handleImported = (userStories: UserStory[]) => {
    setImportedUserStories(userStories);
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">
        Import User Stories
      </h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-base text-muted-foreground max-sm:text-sm">
        Connect your Taiga account to import the user stories linked to this
        project. Corekt will use them to verify their coverage and consistency
        across your other artifacts.
      </p>
      {importedUserStories.length === 0 ? (
        <div className="mt-10 flex h-80 flex-col items-center justify-center rounded-4xl border border-neutral-300 border-dashed p-8">
          <div className="flex items-center justify-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.taiga className="size-6" />
            </div>
            <div className="h-px w-10 border border-dashed" />
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.corekt className="size-6" />
            </div>
          </div>
          <div className="mt-6 font-medium">Connect your Taiga account</div>
          <div className="mt-0.5 mb-4 w-[50%] max-w-prose text-center text-muted-foreground text-sm">
            Bring your user stories as context to power Corekt coherence
            analysis.
          </div>
          <ConnectTaigaDialog onConnected={handleConnected} />
          <SelectTaigaProjectDialog
            open={selectProjectOpen}
            onOpenChange={setSelectProjectOpen}
            projects={taigaProjects}
            onImported={handleImported}
          />
        </div>
      ) : (
        <div className="mt-10 grid h-96 gap-2 overflow-y-auto pr-2">
          {importedUserStories.map((userStory, index) => (
            <StoryCard key={index} story={userStory} />
          ))}
        </div>
      )}
      <Button
        size="lg"
        className="mt-6 w-full"
        disabled={importedUserStories.length === 0}
        onClick={onNext}
      >
        Continue <ChevronRight className="size-4" />
      </Button>
    </>
  );
}

function StoryCard({ story }: { story: UserStory }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border px-4 py-3">
      <p className="font-medium text-sm">{story.title}</p>
      {story.description && (
        <p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs">
          {story.description}
        </p>
      )}
    </div>
  );
}
