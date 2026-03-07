import { AlertTriangleIcon, Box, FolderIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@/features/shared/ui/empty-state";
import { Icons } from "@/features/shared/ui/icons";

function TaigaProjectCard() {
  return (
    <section className="flex items-center gap-4 px-6 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded border">
        <Icons.taiga className="size-6" />
      </div>
      <div>
        <p className="line-clamp-1 max-w-prose font-medium">
          Corekt OpenPlatform
        </p>
        <p className="text-muted-foreground text-xs">
          Contains 25 user stories
        </p>
      </div>
      <Button className="ml-auto" variant="outline">
        Select
      </Button>
    </section>
  );
}

export function SelectTaigaProjectDialog() {
  const items = [
    { title: "TinyWallets", value: "rdx" },
    { title: "Pandaflow", value: "plus" },
  ];

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="secondary">Projects (temp)</Button>}
      />
      <DialogContent className="flex h-[72svh] flex-col gap-0 p-0 md:min-w-110">
        <DialogHeader className="gap-0.5 border-b p-6">
          <DialogTitle className="text-base">Import User Stories</DialogTitle>
          <DialogDescription className="text-pretty">
            Select the project you want to import user stories from.
          </DialogDescription>
        </DialogHeader>
        <div className="border-b bg-gray-50 px-6 py-3">
          <InputGroup className="bg-background">
            <InputGroupInput placeholder="Search projects..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid h-full divide-y overflow-y-scroll">
          {Array.from({ length: 25 }).map((_, index) => {
            return <TaigaProjectCard key={index} />;
          })}
          {/*<EmptyState className="flex items-center justify-center">
            <EmptyStateIcon icon={FolderIcon} />
            <EmptyStateTitle>No Taiga Projects</EmptyStateTitle>
            <EmptyStateDescription className="text-pretty text-center">
              You don't have any Taiga projects to import <br /> user stories
              from.
            </EmptyStateDescription>
          </EmptyState>*/}
        </div>
        <DialogFooter className="mt-auto border-t p-6 py-5">
          <Button className="w-full">Import User Stories</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
