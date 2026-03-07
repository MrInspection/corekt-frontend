"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectTaigaDialog } from "@/features/auth/components/connect-taiga/connect-taiga-dialog";
import { SelectTaigaProjectDialog } from "@/features/auth/components/connect-taiga/select-taiga-project-dialog";
import { Icons } from "@/features/shared/ui/icons";

type ImportUserStoriesStepProps = {
  onStart: () => void;
  onNext: () => void;
};

export function ImportUserStoriesStep({
  onStart,
  onNext,
}: ImportUserStoriesStepProps) {
  const handleContinue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onNext();
  };

  return (
    <>
      <h3 className="mt-1 font-medium text-3xl tracking-tight">
        Import User Stories
      </h3>
      <p className="mt-2 max-w-(--breakpoint-sm) text-pretty text-muted-foreground">
        Connect your Taiga account to import the user stories linked to this
        project. Corekt will use them to verify their coverage and consistency
        across your other artifacts.
      </p>
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
          Bring your user stories as context to power Corekt coherence analysis.
        </div>
        <div className="flex space-x-2">
          <ConnectTaigaDialog />
          <SelectTaigaProjectDialog />
        </div>
      </div>
      <Button size="lg" className="mt-6 w-full" onClick={handleContinue}>
        Continue <ChevronRight className="size-4" />
      </Button>
    </>
  );
}
