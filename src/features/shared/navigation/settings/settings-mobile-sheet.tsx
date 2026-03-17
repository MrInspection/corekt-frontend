import { ChevronLeftIcon, PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationLink } from "@/features/shared/navigation/navigation-link";
import { settingsNavConfig } from "@/features/shared/navigation/settings/settings-nav.config";

export function SettingsMobileSheet() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="ghost" size="icon-xs" />}>
        <PanelLeftIcon className="size-3.5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-sm:max-w-120">
        <SheetHeader className="p-6 pt-4">
          <Link href="/dashboard" className="w-fit">
            <Button variant="ghost" size="sm">
              <ChevronLeftIcon /> Back to app
            </Button>
          </Link>
          <nav className="mt-4 justify-start">
            {settingsNavConfig.map((item, index) => (
              <NavigationLink {...item} key={index} />
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
