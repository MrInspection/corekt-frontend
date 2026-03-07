"use client";

import { GitBranch } from "lucide-react";
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

export function VersionEmptyState() {
  const dialogManager = useDialogManager();

  return (
    <EmptyState>
      <EmptyStateIcon icon={GitBranch} />
      <EmptyStateTitle>Versions</EmptyStateTitle>
      <EmptyStateDescription>
        Versions track the evolution of your analysis over time. Upload your
        deliverables, run a coherence report, and iterate until your
        specifications are consistent and complete
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button
          className="space-x-1"
          onClick={() => dialogManager.openDialog("create-version")}
        >
          <span>Create new version</span>
          <div className="space-x-1">
            <Kbd className="border-muted/80 bg-transparent text-background">
              N
            </Kbd>
            <span className="text-xs">then</span>
            <Kbd className="border-muted/80 bg-transparent text-background">
              V
            </Kbd>
          </div>
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
