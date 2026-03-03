"use client";

import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useDialogManager } from "@/features/shared/dialog-manager/dialog-manager.store";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";

export function ProjectEmptyState() {
  const dialogManager = useDialogManager();

  return (
    <EmptyState>
      <EmptyStateIcon icon={Box} />
      <EmptyStateTitle>Projects</EmptyStateTitle>
      <EmptyStateDescription>
        Projects are larger units of work with a clear outcome. Each project
        groups your deliverables into versioned analyses, so you can measure and
        improve the coherence of your functional specifications over time.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button
          className="space-x-1"
          onClick={() => dialogManager.openDialog("create-project")}
        >
          <span>Create new project</span>
          <div className="space-x-1">
            <Kbd className="border-muted/80 bg-transparent text-background">
              N
            </Kbd>
            <span className="text-xs">then</span>
            <Kbd className="border-muted/80 bg-transparent text-background">
              P
            </Kbd>
          </div>
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
