import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Icons } from "@/features/shared/ui/icons";

export function ConnectTaigaDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Connect Account</Button>} />
      <DialogContent className="w-96 gap-0 rounded-2xl p-0">
        <DialogHeader className="gap-0 px-6 pt-10">
          <div className="flex items-center justify-center">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.taiga className="size-6" />
            </div>
            <div className="h-px w-10 border border-dashed" />
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border bg-background p-2 shadow-xs">
              <Icons.corekt className="size-6" />
            </div>
          </div>
          <h2 className="mt-4 text-center font-medium text-lg">
            Connect Taiga to Corekt
          </h2>
          <p className="mx-auto mt-1 w-[90%] text-center text-muted-foreground">
            Import your user stories from Taiga so Corekt can use them as
            context for the report.
          </p>
        </DialogHeader>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <PasswordInput />
            </div>
          </div>
        </div>
        <div className="border-t p-6">
          <p className="font-semibold">Corekt would like to</p>
          <ul className="mt-2.5 flex flex-col space-y-2 text-left">
            {[
              "Access your project list information",
              "Access the user stories within your projects",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-left">
                <CircleCheck className="size-5 fill-brand-100 stroke-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter className="border-t p-6 py-5">
          <div className="grid w-full grid-cols-2 gap-2">
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button>Connect</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
