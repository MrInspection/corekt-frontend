"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  FilterFieldOption,
  FilterValue,
} from "@/features/shared/advanced-filter/filters.type";

type EnumValuePickerProps = {
  options: FilterFieldOption[];
  value: FilterValue;
  isMulti: boolean;
  onUpdateValue: (value: FilterValue) => void;
};

export function EnumValuePicker({
  options,
  value,
  isMulti,
  onUpdateValue,
}: EnumValuePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedValues = Array.isArray(value)
    ? value
    : value != null
      ? [String(value)]
      : [];

  const selectedLabels = selectedValues
    .map((v) => options.find((o) => o.value === v)?.label ?? v)
    .join(", ");

  function handleSelect(optionValue: string) {
    if (!isMulti) {
      onUpdateValue(optionValue);
      return;
    }

    const next = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    onUpdateValue(next.length > 0 ? next : null);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="xs" autoFocus>
            {selectedValues.length === 0 ? (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                Pick a value <ChevronDownIcon />
              </span>
            ) : (
              <>
                {!isMulti && selectedValues.length === 1 && (
                  <span className="size-3.5 shrink-0">
                    {options.find((o) => o.value === selectedValues[0])?.icon}
                  </span>
                )}
                <span className="truncate">{selectedLabels}</span>
              </>
            )}
          </Button>
        }
      />
      <DropdownMenuContent className="w-48" align="start">
        {isMulti
          ? options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => handleSelect(option.value)}
                onSelect={(e) => e.preventDefault()}
                className="flex items-center gap-2 text-xs"
              >
                {option.icon && (
                  <span className="size-3.5 shrink-0">{option.icon}</span>
                )}
                {option.label}
              </DropdownMenuCheckboxItem>
            ))
          : options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  handleSelect(option.value);
                  setOpen(false);
                }}
                className="flex items-center gap-2 text-xs"
              >
                {option.icon && (
                  <span className="size-3.5 shrink-0">{option.icon}</span>
                )}
                {option.label}
              </DropdownMenuItem>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
