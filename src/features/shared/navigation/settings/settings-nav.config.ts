import { type LucideIcon, Settings2Icon, TrophyIcon } from "lucide-react";

export const settingsNavConfig = [
  {
    label: "Preferences",
    href: "/preferences",
    icon: Settings2Icon,
  },
  {
    label: "Achievements",
    href: "/preferences/achievements",
    icon: TrophyIcon,
  },
] satisfies { label: string; href: string; icon: LucideIcon }[];
