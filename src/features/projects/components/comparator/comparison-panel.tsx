import { GitCompare } from "lucide-react";
import type { ReactNode } from "react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";

type ComparisonPanelProps = {
  label: string;
  isEmpty: boolean;
  children: ReactNode;
};

export function ComparisonPanel({
  label,
  isEmpty,
  children,
}: ComparisonPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-10 shrink-0 items-center border-b px-4">
        <span className="font-medium text-muted-foreground text-xs">
          {label}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-y-auto">
        {isEmpty ? (
          <EmptyState>
            <EmptyStateIcon icon={GitCompare} />
            <EmptyStateTitle>Select a version</EmptyStateTitle>
            <EmptyStateDescription>
              Choose a version from the dropdown above to compare against.
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
