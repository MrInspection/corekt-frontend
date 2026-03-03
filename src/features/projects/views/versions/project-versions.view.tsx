import {
  GitCompare,
  MoreHorizontalIcon,
  Pencil,
  PlusIcon,
  Trash,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VersionCard } from "@/features/projects/components/version-card";
import {
  DashboardContent,
  DashboardHeader,
} from "@/features/shared/ui/layouts/dashboard-layout";

export function ProjectVersionsView() {
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
                <BreadcrumbPage>TinyWallets</BreadcrumbPage>
              </BreadcrumbItem>
              <div className="flex h-5 items-center justify-center rounded-sm bg-muted p-1 px-1.5">
                <span className="font-medium text-xs">4</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="icon-sm" variant="ghost" className="h-7" />
                  }
                >
                  <MoreHorizontalIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pencil className="size-4" /> Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="size-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="icon-xs" variant="ghost">
                    <GitCompare className="size-3.5" />
                  </Button>
                }
              />
              <TooltipContent side="bottom" className="-mt-0.5">
                <span className="mr-2">Compare versions</span>
                <Kbd>C</Kbd> <span className="text-muted-foreground">then</span>{" "}
                <Kbd>V</Kbd>
              </TooltipContent>
            </Tooltip>
            <div className="h-5 w-px bg-border" />
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button size="xs" variant="ghost">
                    <PlusIcon className="size-3.5" /> New Version
                  </Button>
                }
              />
              <TooltipContent side="bottom" align="end" className="-mt-0.5">
                <span className="mr-2">Create new version</span>
                <Kbd>N</Kbd> <span className="text-muted-foreground">then</span>{" "}
                <Kbd>V</Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </DashboardHeader>
      <DashboardContent className="p-4 pt-16">
        <div className="container grid grid-cols-3 gap-4">
          <VersionCard
            id="1"
            title="Lorem ipsum dolor sit amet"
            version={1}
            date="Jan 24, 2026"
            status="draft"
          />
          <VersionCard
            id="2"
            title="Lorem ipsum dolor sit amet"
            version={2}
            date="Jan 24, 2026"
            status="in-progress"
          />
          <VersionCard
            id="3"
            title="Lorem ipsum dolor sit amet"
            version={3}
            date="Jan 20, 2026"
            status="completed"
            issues={{
              minor: 1,
              major: 2,
              critical: 3,
              correct: 4,
            }}
          />
          <VersionCard
            id="2"
            title="Lorem ipsum dolor sit amet"
            version={4}
            date="Jan 24, 2026"
            status="failed"
          />
        </div>
      </DashboardContent>
    </>
  );
}
