import { ChevronDownIcon, GitBranch, GitCompare } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DashboardActionBar,
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";

export function CompareVersionsView() {
  return (
    <>
      <DashboardHeader>
        <div className="flex w-full items-center justify-between gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">TinyWallets</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Compare</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </DashboardHeader>
      <DashboardActionBar className="bg-gray-50">
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
