"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type FilterOperatorId,
  OPERATOR_LABELS,
} from "@/features/shared/advanced-filter/filters.type";

type OperatorPickerProps = {
  operators: FilterOperatorId[];
  selected: FilterOperatorId;
  onSelect: (operator: FilterOperatorId) => void;
};

export function OperatorPicker({
  operators,
  selected,
  onSelect,
}: OperatorPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button size="xs" variant="outline" className="rounded-none">
            {OPERATOR_LABELS[selected]}
          </Button>
        }
      />
      <DropdownMenuContent className="w-48 p-1" align="start">
        {operators.map((operator) => (
          <DropdownMenuItem
            key={operator}
            onClick={() => {
              onSelect(operator);
              setOpen(false);
            }}
          >
            {OPERATOR_LABELS[operator]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
