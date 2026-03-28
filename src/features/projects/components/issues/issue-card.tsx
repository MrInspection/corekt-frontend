"use client";

import {
  ChevronRight,
  CircleAlertIcon,
  CircleDot,
  FileText,
  GitCompare,
  Globe,
  type LucideIcon,
  OctagonX,
  SquareCheck,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  dataTypeLabel,
  fileTypeDescription,
  type Issue,
  type IssueMatch,
  type IssueSeverity,
  type ParsedDataRef,
} from "@/features/projects/validation/issues.types";
import { MarkdownRenderer } from "@/features/shared/markdown/markdown-renderer";
import { cn } from "@/lib/utils";

type IssueCardProps = Issue;

type SeverityConfig = {
  label: string;
  icon: LucideIcon;
  labelColor: string;
  dotColor: string;
};

const severityConfig: Record<IssueSeverity, SeverityConfig> = {
  CRITICAL: {
    label: "Critical",
    icon: OctagonX,
    labelColor: "text-error-500",
    dotColor: "bg-error-500",
  },
  MAJOR: {
    label: "Major",
    icon: CircleAlertIcon,
    labelColor: "text-warning-500",
    dotColor: "bg-warning-500",
  },
  MINOR: {
    label: "Minor",
    icon: CircleDot,
    labelColor: "text-gray-500",
    dotColor: "bg-gray-500",
  },
};

type MatchConfig = {
  label: string;
};

const matchConfig: Record<IssueMatch, MatchConfig> = {
  EXACT: {
    label: "Exact",
  },
  SEMANTIC: {
    label: "Semantic",
  },
  MISSING: {
    label: "Missing",
  },
};

function deriveIssueTitle(sourceParsedData: ParsedDataRef): string {
  return `${sourceParsedData.dataType}: ${sourceParsedData.content}`;
}

function buildSheetMarkdownContent(
  justification: string,
  suggestion: string | null,
): string {
  const suggestionSection = suggestion
    ? `## Suggestion\n${suggestion}`
    : "## Suggestion\n_No suggestion provided._";

  return ["## Justification", justification, "", suggestionSection, ""].join(
    "\n",
  );
}

function IssueCardSeverityLabel({ severity }: { severity: IssueSeverity }) {
  const { label, icon: Icon, labelColor } = severityConfig[severity];

  return (
    <div className={`flex items-center gap-1.5 text-sm ${labelColor}`}>
      <Icon className="size-4" />
      <span className="font-medium">{label} Severity</span>
    </div>
  );
}

export function IssueCard({
  match,
  severity,
  confidenceScore,
  justification,
  suggestion,
  sourceParsedData,
  targetParsedData,
  isResolved = false,
}: IssueCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const title = deriveIssueTitle(sourceParsedData);
  const sheetContent = buildSheetMarkdownContent(justification, suggestion);

  const { label: severityLabel } = severityConfig[severity];
  const { label: matchLabel } = matchConfig[match];

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={true}>
      <SheetTrigger className="text-left focus:rounded-2xl">
        <section className="cursor-pointer rounded-2xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-lg">
          <div className="p-6">
            <p className="line-clamp-1 font-semibold text-base">{title}</p>
            <p className="mt-1 line-clamp-2 text-pretty text-muted-foreground text-sm">
              {justification}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-25 px-6 py-4">
            <IssueCardSeverityLabel severity={severity} />
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm max-hidden:hidden">
              <span className="font-medium max-sm:hidden">Click to view</span>
              <ChevronRight className="size-4" />
            </div>
          </div>
        </section>
      </SheetTrigger>

      <SheetContent
        className="flex min-w-full flex-1 flex-col gap-0 divide-y overflow-hidden md:mt-4 md:mr-4 md:max-h-[97vh] md:min-w-116 md:rounded-2xl"
        showCloseButton={false}
      >
        <SheetHeader className="p-6">
          <div className="flex items-start justify-between gap-8">
            <SheetTitle className="text-base">{title}</SheetTitle>
            <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
              <XIcon />
            </SheetClose>
          </div>

          <div className="space-y-3 pt-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <CircleDot className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Severity</span>
              </div>
              <Badge variant="outline" className="w-fit rounded">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    severityConfig[severity].dotColor,
                  )}
                />{" "}
                {severityLabel}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <GitCompare className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Match</span>
              </div>
              <Badge variant="outline" className="w-fit rounded">
                {matchLabel}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <SquareCheck className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Confidence score</span>
              </div>
              <p className="font-semibold text-sm">
                {confidenceScore.toFixed(2)}%
              </p>
            </div>

            <div className="grid gap-2">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <Globe className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>
                  Detection source
                  {sourceParsedData.fileId === targetParsedData.fileId
                    ? null
                    : "s"}
                </span>
              </div>

              <div className="ml-2 space-y-2 border-l-2 px-4 pt-2">
                <div className="inline-flex items-start gap-2">
                  <FileText className="size-4.5 shrink-0" />
                  <span>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="font-medium">
                          {sourceParsedData.fileName}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {fileTypeDescription[sourceParsedData.fileType]}
                      </TooltipContent>
                    </Tooltip>{" "}
                    {dataTypeLabel[sourceParsedData.dataType]}.
                  </span>
                </div>
                {sourceParsedData.fileId !== targetParsedData.fileId && (
                  <div className="inline-flex items-start gap-2">
                    <FileText className="size-4.5 shrink-0" />
                    <span>
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="font-medium">
                            {targetParsedData.fileName}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {fileTypeDescription[targetParsedData.fileType]}
                        </TooltipContent>
                      </Tooltip>{" "}
                      {dataTypeLabel[targetParsedData.dataType]}.
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full"
              disabled={isResolved}
            >
              Mark as false detection
            </Button>
          </div>
        </SheetHeader>
        <div className="flex flex-1 grow flex-col gap-4 overflow-y-auto p-6 pt-1">
          <MarkdownRenderer content={sheetContent} />
        </div>
        <SheetFooter>
          <Button disabled={isResolved}>Mark as resolved</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
