"use client";

import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";

export function FilterEmptyState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  return (
    <EmptyState>
      <EmptyStateIcon icon={ListFilter} />
      <EmptyStateTitle>No results matching your filters</EmptyStateTitle>
      <EmptyStateDescription className="w-[90%]">
        Try adjusting or clearing your filters to find what you're looking for.
      </EmptyStateDescription>
      <EmptyStateAction>
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="space-x-1.5"
        >
          <span>Clear Filters</span>{" "}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>F</Kbd>
          </KbdGroup>
        </Button>
      </EmptyStateAction>
    </EmptyState>
  );
}
