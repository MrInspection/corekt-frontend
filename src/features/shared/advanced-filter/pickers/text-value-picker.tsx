"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FilterValue } from "@/features/shared/advanced-filter/filters.type";

type TextValuePickerProps = {
  value: FilterValue;
  type?: "text" | "number";
  onUpdateValue: (value: FilterValue) => void;
};

export function TextValuePicker({
  value,
  type = "text",
  onUpdateValue,
}: TextValuePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(value != null ? String(value) : "");

  const displayValue = value != null && value !== "" ? String(value) : null;

  function handleCommit() {
    const trimmed = draft.trim();
    onUpdateValue(
      trimmed !== "" ? (type === "number" ? Number(trimmed) : trimmed) : null,
    );
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" size="xs" autoFocus>
            {displayValue == null ? (
              <span className="text-muted-foreground italic">
                Insert a value
              </span>
            ) : (
              <span className="truncate">{displayValue}</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-48 gap-0 p-2">
        <Input
          autoFocus
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommit();
            if (e.key === "Escape") setOpen(false);
          }}
          className="h-7 rounded [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Enter value…"
        />
      </PopoverContent>
    </Popover>
  );
}
