"use client";

import { ShieldCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";

export function IssuesResolvedState() {
  return (
    <div className="relative flex h-130 flex-col items-center justify-center rounded-2xl border">
      <EmptyState>
        <EmptyStateIcon icon={ShieldCheckIcon} />
        <EmptyStateTitle>All Issues Resolved</EmptyStateTitle>
        <EmptyStateDescription>
          You resolved every issue flagged in this report. Your analysis is now
          fully coherent. Run a new version to confirm your progress and keep
          your score climbing.
        </EmptyStateDescription>
        <EmptyStateAction className="space-x-2">
          <Button className="space-x-1">
            Export your report
            <div className="space-x-1">
              <Kbd className="border-muted/80 bg-transparent text-background">
                E
              </Kbd>
              <span className="text-xs">then</span>
              <Kbd className="border-muted/80 bg-transparent text-background">
                R
              </Kbd>
            </div>
          </Button>
        </EmptyStateAction>
      </EmptyState>
    </div>
  );
}
