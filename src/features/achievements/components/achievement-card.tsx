import { formatDate } from "date-fns";
import { Check } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EnrichedAchievement } from "@/features/achievements/views/achievements.view";
import { Icons } from "@/features/shared/ui/icons";

export function AchievementCard({
  name,
  description,
  hidden,
  isUnlocked,
  acquiredAt,
}: EnrichedAchievement) {
  return (
    <AccordionItem className="overflow-clip rounded-xl border" hidden={hidden}>
      <AccordionTrigger className="flex items-center gap-4 px-4 hover:no-underline">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted/60">
          <Icons.corekt className="size-5" />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 font-medium">
            <span>{name}</span>
            {isUnlocked && acquiredAt && (
              <Tooltip>
                <TooltipTrigger
                  render={<Check className="size-4 text-success-600" />}
                />
                <TooltipContent>
                  Unlocked on {formatDate(acquiredAt, "MMM dd, yyyy")}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="border-t bg-gray-50 px-4 py-2">
        Here lies the achievement conditions
      </AccordionContent>
    </AccordionItem>
  );
}
