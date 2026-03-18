"use client";

import {
  Check,
  ChevronRight,
  CircleAlertIcon,
  CircleDot,
  FlagTriangleRight,
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
import { MarkdownRenderer } from "@/features/shared/markdown/markdown-renderer";

export type IssueSeverity = "critical" | "major" | "minor";

type SeverityConfig = {
  label: string;
  icon: LucideIcon;
  labelColor: string;
};

const severityConfig: Record<IssueSeverity, SeverityConfig> = {
  critical: {
    label: "Critical",
    icon: OctagonX,
    labelColor: "text-error-500",
  },
  major: {
    label: "Major",
    icon: CircleAlertIcon,
    labelColor: "text-warning-500",
  },
  minor: {
    label: "Minor",
    icon: CircleDot,
    labelColor: "text-gray-500",
  },
};

type IssueCardProps = {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  isResolved: boolean;
  confidenceScore: number;
  content: string;
};

function IssueCardSeverity({ severity }: { severity: IssueSeverity }) {
  const { label, icon: Icon, labelColor } = severityConfig[severity];

  return (
    <div className={`flex items-center gap-1.5 text-sm ${labelColor}`}>
      <Icon className="size-4" />
      <span className="font-medium">{label} Severity</span>
    </div>
  );
}

export function IssueCard({
  id,
  title,
  description,
  severity,
  isResolved,
  confidenceScore,
  content,
}: IssueCardProps) {
  const [openSheet, setOpenSheet] = useState(false);
  const { label: severityLabel } = severityConfig[severity];

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet} modal={true}>
      <SheetTrigger className="text-left focus:rounded-2xl">
        <section className="cursor-pointer rounded-2xl border bg-card shadow-xs transition-transform duration-150 hover:-translate-y-0.5 hover:border-gray-300 hover:border-b-4 hover:shadow-lg">
          <div className="p-6">
            <p className="font-semibold text-base">{title}</p>
            <p className="mt-1 text-pretty text-muted-foreground text-sm">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-b-2xl border-t bg-gray-25 px-6 py-4">
            <div className="flex items-center gap-3">
              <IssueCardSeverity severity={severity} />
              <div
                className="flex items-center gap-1.5 text-sm text-success-600"
                hidden={!isResolved}
              >
                <Check className="size-4" />
                <span className="font-medium">Resolved</span>
              </div>
            </div>
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
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">{title}</SheetTitle>
            <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
              <XIcon />
            </SheetClose>
          </div>
          <div className="space-y-3 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2">
                <CircleDot className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Severity</span>
              </div>
              <Badge variant="outline" className="rounded">
                {severityLabel}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2">
                <SquareCheck className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Confidence Score</span>
              </div>
              <p className="font-semibold">{confidenceScore.toFixed(2)}%</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="inline-flex items-center gap-2">
                <FlagTriangleRight className="size-4.5 shrink-0 fill-gray-100 text-muted-foreground" />
                <span>Status</span>
              </div>
              <p className="font-semibold">
                {isResolved ? "Resolved" : "Not Resolved"}
              </p>
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
        <div className="flex flex-1 grow flex-col overflow-y-auto p-6">
          <MarkdownRenderer content={content} />
        </div>
        <SheetFooter>
          <Button disabled={isResolved}>Mark as resolved</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
