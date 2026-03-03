import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/features/shared/ui/icons";

export function SelectTaigaProjectDialog() {
  const items = [
    { title: "TinyWallets", value: "rdx" },
    { title: "Pandaflow", value: "plus" },
  ];

  return (
    <Dialog>
      <DialogTrigger render={<Button>Projects</Button>} />
      <DialogContent className="w-96 gap-0 rounded-2xl p-0">
        <DialogHeader className="border-b p-6">
          <DialogTitle>Import User Stories</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="relative flex items-start gap-2 rounded-xl border p-2.5">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-200">
              <Icons.taiga className="size-6" />
            </div>
            <div>
              <p className="font-medium leading-snug">TinyWallets</p>
              <p className="text-muted-foreground text-xs">
                Contains 25 user stories
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t p-6 py-5">
          <Button className="w-full">Import User Stories</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
