"use client";

import { ChevronDownIcon, GitBranch, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DashboardSidebarSheet } from "@/features/shared/navigation/dashboard/dashboard-sidebar-sheet";
import { DynamicBreadcrumb } from "@/features/shared/navigation/dynamic-breadcrumb";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/dashboard-layout";

export function CompareVersionsView() {
  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="inline-flex shrink-0 items-center gap-2">
            <DashboardSidebarSheet />
            <DynamicBreadcrumb hrefOverrides={{ projects: "/dashboard" }} />
          </div>
        </div>
      </DashboardHeader>
      <DashboardActionBar className="bg-gray-25">
        <div className="flex items-center gap-1.5">
          <ButtonGroup>
            <Button variant="outline" size="xs">
              <GitCompare /> Compare
            </Button>
            <Button variant="outline" size="xs">
              <GitBranch className="text-purple-600" /> v1
            </Button>
            <Button variant="outline" size="xs">
              with
            </Button>
            <Button
              variant="outline"
              size="xs"
              className="text-muted-foreground"
            >
              <GitBranch /> select version{" "}
              <ChevronDownIcon className="size-4" />
            </Button>
          </ButtonGroup>
        </div>
      </DashboardActionBar>
      <DashboardContent className="grid grid-cols-2 divide-x">
        <div />
        <div />
      </DashboardContent>
    </>
  );
}
