"use client";

import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationLink } from "@/features/shared/navigation/navigation-link";
import { settingsNavConfig } from "@/features/shared/navigation/settings/settings-nav.config";

export function SettingsSidebar() {
  return (
    <div className="flex w-56 flex-col items-start px-2.5 py-4 max-md:hidden">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm">
          <ChevronLeftIcon /> Back to app
        </Button>
      </Link>
      <nav className="mt-4 justify-start">
        {settingsNavConfig.map((item, index) => (
          <NavigationLink {...item} key={index} />
        ))}
      </nav>
    </div>
  );
}
