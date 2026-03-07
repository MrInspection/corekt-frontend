"use client";

import confetti from "canvas-confetti";
import { ShieldCheckIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";

export function NoIssuesState() {
  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#42307d", "#6941c6", "#9e77ed", "#d6bbfb"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 1 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 1 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    const timeout = setTimeout(triggerConfetti, 800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex h-110 flex-col items-center justify-center rounded-2xl border">
      <EmptyState>
        <EmptyStateIcon icon={ShieldCheckIcon} />
        <EmptyStateTitle>No Issues</EmptyStateTitle>
        <EmptyStateDescription>
          Outstanding work. Your analysis is fully coherent. No issues were
          detected across your deliverables. Keep the streak going and push for
          a perfect score on your next version.
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
