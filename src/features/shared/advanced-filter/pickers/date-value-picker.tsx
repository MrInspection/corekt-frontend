"use client";

import { format, isValid, parseISO } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FilterValue } from "@/features/shared/advanced-filter/filters.type";

type DateValuePickerProps = {
  value: FilterValue;
  onUpdateValue: (value: FilterValue) => void;
};

export function DateValuePicker({
  value,
  onUpdateValue,
}: DateValuePickerProps) {
  const [open, setOpen] = useState(false);

  const parsedDate =
    typeof value === "string" && isValid(parseISO(value))
      ? parseISO(value)
      : undefined;

  function handleSelect(date: Date | undefined) {
    onUpdateValue(date ? format(date, "yyyy-MM-dd") : null);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" size="xs" autoFocus>
            {parsedDate ? (
              <span className="truncate">
                {format(parsedDate, "MMM d, yyyy")}
              </span>
            ) : (
              <span className="text-muted-foreground italic">Pick a date</span>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={parsedDate} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
}
