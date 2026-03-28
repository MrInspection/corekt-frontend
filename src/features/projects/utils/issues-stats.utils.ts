import type { Issue } from "@/features/projects/validation/issues.types";

export type IssueStats = {
  total: number;
  critical: number;
  major: number;
  minor: number;
  averageConfidenceScore: number;
};

export function computeIssueStats(issues: Issue[]): IssueStats {
  const total = issues.length;

  return {
    total,
    critical: issues.filter((i) => i.severity === "CRITICAL").length,
    major: issues.filter((i) => i.severity === "MAJOR").length,
    minor: issues.filter((i) => i.severity === "MINOR").length,
    averageConfidenceScore:
      total > 0
        ? Math.round(
            (issues.reduce((sum, i) => sum + i.confidenceScore, 0) / total) *
              100,
          ) / 100
        : 0,
  };
}
