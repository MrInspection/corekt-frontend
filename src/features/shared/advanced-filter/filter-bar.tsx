"use client";

import { ListFilter, X } from "lucide-react";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type ActiveFilter,
  type FilterField,
  type FilterOperatorId,
  type FilterValue,
  OPERATORS_BY_FIELD_TYPE,
} from "@/features/shared/advanced-filter/filters.type";
import { DateValuePicker } from "@/features/shared/advanced-filter/pickers/date-value-picker";
import { EnumValuePicker } from "@/features/shared/advanced-filter/pickers/enum-value-picker";
import { OperatorPicker } from "@/features/shared/advanced-filter/pickers/operator-picker";
import { TextValuePicker } from "@/features/shared/advanced-filter/pickers/text-value-picker";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  fields: FilterField[];
  filters: ActiveFilter[];
  onAddFilter: (fieldId: string) => void;
  onUpdateOperator: (filterId: string, operator: FilterOperatorId) => void;
  onUpdateValue: (filterId: string, value: FilterValue) => void;
  onRemoveFilter: (filterId: string) => void;
  onClearFilters: () => void;
  className?: string;
};

export function FilterBar({
  fields,
  filters,
  onAddFilter,
  onUpdateOperator,
  onUpdateValue,
  onRemoveFilter,
  onClearFilters,
  className,
}: FilterBarProps) {
  useHotkeys("mod+shift+f", () => onClearFilters());

  return (
    <div className={cn("flex w-full flex-wrap items-center gap-1", className)}>
      {filters.map((filter) => {
        const field = fields.find((f) => f.id === filter.fieldId);
        if (!field) return null;
        return (
          <FilterPill
            key={filter.id}
            filter={filter}
            field={field}
            onUpdateOperator={(op) => onUpdateOperator(filter.id, op)}
            onUpdateValue={(val) => onUpdateValue(filter.id, val)}
            onRemove={() => onRemoveFilter(filter.id)}
          />
        );
      })}
      <AddFilterButton fields={fields} onSelect={onAddFilter} />
      {filters.length > 0 && (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-7 text-xs"
                onClick={onClearFilters}
              />
            }
          >
            Clear
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            <span className="mr-1">Clear all filters </span>
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>F</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

type FilterPillProps = {
  filter: ActiveFilter;
  field: FilterField;
  onUpdateOperator: (operator: FilterOperatorId) => void;
  onUpdateValue: (value: FilterValue) => void;
  onRemove: () => void;
};

function FilterPill({
  filter,
  field,
  onUpdateOperator,
  onUpdateValue,
  onRemove,
}: FilterPillProps) {
  const availableOperators = OPERATORS_BY_FIELD_TYPE[field.type];

  return (
    <ButtonGroup>
      <Button variant="outline" size="xs" className="hover:bg-background">
        {field.icon && <span className="size-3.5 shrink-0">{field.icon}</span>}
        {field.label}
      </Button>
      <OperatorPicker
        operators={availableOperators}
        selected={filter.operator}
        onSelect={onUpdateOperator}
      />
      <ValuePicker
        field={field}
        filter={filter}
        onUpdateValue={onUpdateValue}
      />
      <Button
        onClick={onRemove}
        variant="outline"
        size="icon-xs"
        aria-label="Remove filter"
      >
        <X className="size-3" />
      </Button>
    </ButtonGroup>
  );
}

type ValuePickerProps = {
  field: FilterField;
  filter: ActiveFilter;
  onUpdateValue: (value: FilterValue) => void;
};

function ValuePicker({ field, filter, onUpdateValue }: ValuePickerProps) {
  const isMulti =
    filter.operator === "is_any_of" || filter.operator === "is_none_of";

  if (field.type === "enum" && field.options) {
    return (
      <EnumValuePicker
        options={field.options}
        value={filter.value}
        isMulti={isMulti}
        onUpdateValue={onUpdateValue}
      />
    );
  }

  if (field.type === "date") {
    return (
      <DateValuePicker value={filter.value} onUpdateValue={onUpdateValue} />
    );
  }

  return (
    <TextValuePicker
      value={filter.value}
      type={field.type === "number" ? "number" : "text"}
      onUpdateValue={onUpdateValue}
    />
  );
}

type AddFilterButtonProps = {
  fields: FilterField[];
  onSelect: (fieldId: string) => void;
};

function AddFilterButton({ fields, onSelect }: AddFilterButtonProps) {
  const [open, setOpen] = useState(false);
  useHotkeys("f", () => setOpen(true));

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 px-2 text-xs"
                >
                  <ListFilter className="size-3.5" />
                  Filter
                </Button>
              }
            />
          }
        />
        <TooltipContent side="bottom">
          <span className="mr-1.5">Add filter</span>
          <Kbd>F</Kbd>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          {fields.map((field) => (
            <DropdownMenuItem
              key={field.id}
              onClick={() => {
                onSelect(field.id);
                setOpen(false);
              }}
              className="flex items-center gap-2 text-xs"
            >
              {field.icon && (
                <span className="size-3.5 shrink-0">{field.icon}</span>
              )}
              {field.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
