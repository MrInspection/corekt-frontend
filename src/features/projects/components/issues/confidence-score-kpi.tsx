"use client";

import { InfoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ConfidenceScoreKpiProps = {
  score: number;
};

const BAR_WIDTH = 24;
const BAR_GAP = 4;

function resolveScoreColor(score: number): string {
  if (score <= 33) return "bg-error-500";
  if (score <= 66) return "bg-warning-500";
  if (score <= 80) return "bg-warning-400";
  if (score <= 90) return "bg-success-500";
  return "bg-success-600";
}

export function ConfidenceScoreKpi({ score }: ConfidenceScoreKpiProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barCount, setBarCount] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const availableWidth = entry.contentRect.width;
      const count = Math.floor(
        (availableWidth + BAR_GAP) / (BAR_WIDTH + BAR_GAP),
      );
      setBarCount(Math.max(1, count));
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const filledBarCount = Math.round((score / 100) * barCount);
  const activeBarColor = resolveScoreColor(score);

  return (
    <section className={cn("rounded-2xl border p-6 shadow-xs")}>
      <div className="mb-0.5 flex items-center gap-1.5 text-muted-foreground text-sm">
        <span>Confidence Score</span>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="size-3.5 fill-gray-100" />
          </TooltipTrigger>
          <TooltipContent className="w-52">
            <p>
              The confidence score is the sum of the confidence scores of all
              issues in this version.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-baseline gap-1">
        <h4 className="font-semibold text-4xl tracking-tight">{score}</h4>
        <span className="text-xl">%</span>
      </div>
      <div
        ref={containerRef}
        className="mt-4 flex w-full gap-1 overflow-hidden"
      >
        {Array.from({ length: barCount }, (_, index) => (
          <div
            key={index}
            className={cn(
              "h-10 w-6 shrink-0 rounded-sm",
              index < filledBarCount ? activeBarColor : "bg-muted",
            )}
          />
        ))}
      </div>
    </section>
  );
}
