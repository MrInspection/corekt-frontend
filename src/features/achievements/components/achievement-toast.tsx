import { toast } from "sonner";
import { Icons } from "@/features/shared/ui/icons";
import {playSound} from "@/lib/sound";

type AchievementToastProps = {
  name: string;
  description: string;
};

function AchievementToastContent({ name, description }: AchievementToastProps) {
  return (
    <div className="flex w-full items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
        <Icons.corekt className="size-5" />
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="mb-0.5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Achievement Unlocked
        </p>
        <p className="font-semibold text-sm leading-snug">{name}</p>
        <p className="text-muted-foreground text-xs leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}

export function showAchievementToast({
  name,
  description,
}: AchievementToastProps) {
  toast(<AchievementToastContent name={name} description={description} />, {
    position: "top-right",
    duration: 6000,
  });
  setTimeout(() => playSound("achievementGranted"), 300);
}
