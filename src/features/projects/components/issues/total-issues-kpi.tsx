"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type IssueCounts = {
  resolved: number;
  minor: number;
  major: number;
  critical: number;
};

type TotalIssuesKPIProps = {
  issuesCount: number;
  counts: IssueCounts;
  isLoading?: boolean;
  className?: string;
};

type IssueSegmentConfig = {
  key: keyof IssueCounts;
  label: string;
  colorClass: string;
};

const ISSUE_SEGMENTS: IssueSegmentConfig[] = [
  { key: "minor", label: "Minor", colorClass: "bg-gray-500" },
  { key: "major", label: "Major", colorClass: "bg-warning-500" },
  { key: "critical", label: "Critical", colorClass: "bg-error-500" },
];

export function TotalIssuesKpi({
  issuesCount = 0,
  counts,
  isLoading = false,
  className,
}: TotalIssuesKPIProps) {
  const total =
    (counts.minor ?? 0) + (counts.major ?? 0) + (counts.critical ?? 0);

  if (!counts) {
    return (
      <section className={cn("rounded-2xl border p-6 shadow-xs", className)}>
        <p className="mb-0.5 text-muted-foreground text-sm">Total Issues</p>
        <h4 className="font-semibold text-4xl tracking-tight">{issuesCount}</h4>
        <div className="mt-4 h-2.5 w-full animate-pulse rounded-xl bg-muted" />
      </section>
    );
  }

  const segments = ISSUE_SEGMENTS.map((segment) => {
    const value = counts[segment.key];

    if (value <= 0 || total <= 0) return null;
    const percentage = (value / total) * 100;

    return {
      ...segment,
      value,
      percentage,
    };
  }).filter(Boolean) as Array<
    IssueSegmentConfig & { value: number; percentage: number }
  >;

  const hasData = segments.length > 0;

  return (
    <section
      className={cn("h-max rounded-2xl border p-6 shadow-xs", className)}
    >
      <p className="mb-0.5 text-muted-foreground text-sm">Total Issues</p>
      <div className="flex items-baseline gap-2">
        <h4 className="font-semibold text-4xl tracking-tight">{issuesCount}</h4>
      </div>

      {/* KPI Bar */}
      <div className="mt-4 flex h-2.5 w-full gap-1 overflow-hidden rounded-xl">
        {isLoading || !hasData ? (
          <div
            className={cn(
              "h-full w-full rounded-xl bg-muted",
              isLoading && "animate-pulse",
            )}
          />
        ) : (
          segments.map((segment, index) => {
            const isFirst = index === 0;
            const isLast = index === segments.length - 1;

            return (
              <div
                key={segment.key}
                className={cn(
                  "h-full",
                  segment.colorClass,
                  isFirst && "rounded-s-xl",
                  isLast && "rounded-e-xl",
                )}
                style={{ width: `${segment.percentage}%` } as CSSProperties}
              />
            );
          })
        )}
      </div>

      {/* KPI Legend */}
      <section className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
        {ISSUE_SEGMENTS.map((segment) => (
          <div key={segment.key} className="flex items-center gap-2">
            <div className={cn("size-2.5", segment.colorClass)} />
            <p className="text-muted-foreground text-sm">
              <span className="font-medium text-foreground">
                {counts[segment.key]}
              </span>{" "}
              {segment.label}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
}
