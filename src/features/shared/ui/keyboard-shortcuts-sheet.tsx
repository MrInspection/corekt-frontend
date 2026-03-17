"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function KeyboardShortcutsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className="mt-4 mr-4 flex flex-1 flex-col gap-0 overflow-hidden rounded-2xl bg-background md:max-h-[97vh]"
        showCloseButton={false}
      >
        <SheetHeader className="p-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">Keyboard Shortcuts</SheetTitle>
            <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
              <XIcon />
            </SheetClose>
          </div>
          <h3 className="mt-4 font-medium">General</h3>
          <div className="mt-2 grid gap-3">
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Logout</p>
              <div>
                <Kbd className="bg-background">L</Kbd>{" "}
                <span className="text-muted-foreground">then</span>{" "}
                <Kbd className="bg-background">O</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Keyboard Shortcuts</p>
              <KbdGroup>
                <Kbd className="bg-background">Ctrl</Kbd>
                <Kbd className="bg-background">H</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Add a filter</p>
              <KbdGroup>
                <Kbd className="bg-background">F</Kbd>
              </KbdGroup>
            </div>
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Clear all filters</p>
              <KbdGroup>
                <Kbd className="bg-background">Ctrl</Kbd>
                <Kbd className="bg-background">Shift</Kbd>
                <Kbd className="bg-background">F</Kbd>
              </KbdGroup>
            </div>
          </div>
          <h3 className="mt-6 font-medium">Projects</h3>
          <div className="mt-2 grid gap-3">
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Create new project</p>
              <div>
                <Kbd className="bg-background">N</Kbd>{" "}
                <span className="text-muted-foreground">then</span>{" "}
                <Kbd className="bg-background">P</Kbd>
              </div>
            </div>
          </div>
          <h3 className="mt-6 font-medium">Versions</h3>
          <div className="mt-2 grid gap-3">
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Create new version</p>
              <div>
                <Kbd className="bg-background">N</Kbd>{" "}
                <span className="text-muted-foreground">then</span>{" "}
                <Kbd className="bg-background">V</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Compare versions</p>
              <div>
                <Kbd className="bg-background">C</Kbd>{" "}
                <span className="text-muted-foreground">then</span>{" "}
                <Kbd className="bg-background">V</Kbd>
              </div>
            </div>
          </div>
          <h3 className="mt-6 font-medium">Issues</h3>
          <div className="mt-2 grid gap-3">
            <div className="flex items-center justify-between gap-6">
              <p className="text-muted-foreground">Export a report</p>
              <div>
                <Kbd className="bg-background">E</Kbd>{" "}
                <span className="text-muted-foreground">then</span>{" "}
                <Kbd className="bg-background">R</Kbd>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
