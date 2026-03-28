"use client";

import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { IssueCard } from "@/features/projects/components/issues/issue-card";
import { IssuesLoadingState } from "@/features/projects/components/states/issues-loading-state";
import type { IssueStats } from "@/features/projects/utils/issues-stats.utils";
import type { Issue } from "@/features/projects/validation/issues.types";
import { cn } from "@/lib/utils";

type CompareViewProps = {
  issues: Issue[];
  isPending: boolean;
  stats: IssueStats;
  baseStats?: IssueStats;
};

type StatDeltaDirection = "better" | "worse" | "neutral";

type StatEntry = {
  label: string;
  value: number;
  delta: number | null;
  higherIsBetter: boolean;
};

function getDeltaDirection(
  delta: number,
  higherIsBetter: boolean,
): StatDeltaDirection {
  if (delta === 0) return "neutral";
  return delta > 0 === higherIsBetter ? "better" : "worse";
}

function DeltaBadge({
  delta,
  direction,
}: {
  delta: number;
  direction: StatDeltaDirection;
}) {
  const Icon =
    direction === "neutral"
      ? MinusIcon
      : delta > 0
        ? ArrowUpIcon
        : ArrowDownIcon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs tabular-nums",
        direction === "better" && "text-success-600",
        direction === "worse" && "text-destructive",
        direction === "neutral" && "text-muted-foreground",
      )}
    >
      <Icon className="size-3.5" />
      {Math.abs(delta)}
    </span>
  );
}

function CompareStatsStrip({
  stats,
  baseStats,
}: {
  stats: IssueStats;
  baseStats?: IssueStats;
}) {
  const entries: StatEntry[] = [
    {
      label: "Total",
      value: stats.total,
      delta: baseStats != null ? stats.total - baseStats.total : null,
      higherIsBetter: false,
    },
    {
      label: "Critical",
      value: stats.critical,
      delta: baseStats != null ? stats.critical - baseStats.critical : null,
      higherIsBetter: false,
    },
    {
      label: "Major",
      value: stats.major,
      delta: baseStats != null ? stats.major - baseStats.major : null,
      higherIsBetter: false,
    },
    {
      label: "Minor",
      value: stats.minor,
      delta: baseStats != null ? stats.minor - baseStats.minor : null,
      higherIsBetter: false,
    },
    {
      label: "Avg. confidence",
      value: stats.averageConfidenceScore,
      delta:
        baseStats != null
          ? Math.round(
              (stats.averageConfidenceScore -
                baseStats.averageConfidenceScore) *
                100,
            ) / 100
          : null,
      higherIsBetter: true,
    },
  ];

  return (
    <div className="sticky top-0 z-10 flex shrink-0 border-b bg-background">
      {entries.map(({ label, value, delta, higherIsBetter }) => (
        <div
          key={label}
          className="flex flex-1 flex-col items-center gap-0.5 border-r px-2 py-2.5 text-center last:border-r-0"
        >
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground text-sm tabular-nums leading-none">
              {value}
            </span>
            {delta !== null && (
              <DeltaBadge
                delta={delta}
                direction={getDeltaDirection(delta, higherIsBetter)}
              />
            )}
          </div>
          <span className="text-muted-foreground text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}

function CompareEmptyIssues() {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-lg border border-dashed px-3 py-8 text-center">
      <p className="font-medium text-muted-foreground text-sm">No issues</p>
      <p className="mt-1 max-w-xs text-muted-foreground text-xs leading-snug">
        This version has no detected issues. Pick another version to compare
        findings.
      </p>
    </div>
  );
}

export function CompareSection({
  issues,
  isPending,
  stats,
  baseStats,
}: CompareViewProps) {
  return (
    <div className="flex w-full flex-col">
      <CompareStatsStrip stats={stats} baseStats={baseStats} />
      <div className="flex flex-col gap-4 px-8 py-8">
        {isPending ? (
          <IssuesLoadingState />
        ) : stats.total === 0 ? (
          <CompareEmptyIssues />
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} {...issue} />)
        )}
      </div>
    </div>
  );
}
