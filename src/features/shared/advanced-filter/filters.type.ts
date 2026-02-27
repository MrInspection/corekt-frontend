import type { ReactNode } from "react";

export type FilterOperatorId =
  | "is"
  | "is_not"
  | "is_any_of"
  | "is_none_of"
  | "contains"
  | "does_not_contain"
  | "starts_with"
  | "ends_with"
  | "gt"
  | "gte"
  | "lt"
  | "lte";

export type FilterFieldType = "enum" | "text" | "number" | "date";

export const OPERATORS_BY_FIELD_TYPE: Record<
  FilterFieldType,
  FilterOperatorId[]
> = {
  enum: ["is", "is_not", "is_any_of", "is_none_of"],
  text: ["contains", "does_not_contain"],
  number: ["is", "is_not", "gt", "gte", "lt", "lte"],
  date: ["is", "is_not", "gt", "gte", "lt", "lte"],
};

export const OPERATOR_LABELS: Record<FilterOperatorId, string> = {
  is: "is",
  is_not: "is not",
  is_any_of: "is any of",
  is_none_of: "is none of",
  contains: "contains",
  does_not_contain: "does not contain",
  starts_with: "starts with",
  ends_with: "ends with",
  gt: "greater than",
  gte: "greater than or equal to",
  lt: "less than",
  lte: "less than or equal to",
};

export type FilterFieldOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type FilterField = {
  id: string;
  label: string;
  type: FilterFieldType;
  icon?: ReactNode;
  options?: FilterFieldOption[];
};

export type FilterValue = string | string[] | number | null;

export type ActiveFilter = {
  id: string; // unique instance id
  fieldId: string;
  operator: FilterOperatorId;
  value: FilterValue;
};

/**
 * Pure function — applies a list of ActiveFilters against a single row object.
 * Use this for frontend filtering (simple arrays).
 *
 * @example
 * const visible = rows.advanced-filter(row => matchesAllFilters(row, activeFilters, fields));
 */
export function matchesAllFilters<TRow extends Record<string, unknown>>(
  row: TRow,
  filters: ActiveFilter[],
  fields: FilterField[],
): boolean {
  return filters.every((filter) => matchesSingleFilter(row, filter, fields));
}

function matchesSingleFilter<TRow extends Record<string, unknown>>(
  row: TRow,
  filter: ActiveFilter,
  fields: FilterField[],
): boolean {
  const field = fields.find((f) => f.id === filter.fieldId);
  if (!field) return true;

  const cellValue = row[filter.fieldId];
  const filterValue = filter.value;
  const { operator } = filter;

  const normalizedCellValue =
    field.type === "date" && cellValue != null
      ? String(cellValue).slice(0, 10)
      : cellValue;

  const cellStr = String(normalizedCellValue ?? "").toLowerCase();

  switch (operator) {
    case "is":
      return cellStr === String(filterValue ?? "").toLowerCase();
    case "is_not":
      return cellStr !== String(filterValue ?? "").toLowerCase();
    case "is_any_of":
      return (
        Array.isArray(filterValue) &&
        filterValue.map((v) => v.toLowerCase()).includes(cellStr)
      );
    case "is_none_of":
      return (
        Array.isArray(filterValue) &&
        !filterValue.map((v) => v.toLowerCase()).includes(cellStr)
      );
    case "contains":
      return cellStr.includes(String(filterValue ?? "").toLowerCase());
    case "does_not_contain":
      return !cellStr.includes(String(filterValue ?? "").toLowerCase());
    case "starts_with":
      return cellStr.startsWith(String(filterValue ?? "").toLowerCase());
    case "ends_with":
      return cellStr.endsWith(String(filterValue ?? "").toLowerCase());
    case "gt":
      if (field.type === "date")
        return String(normalizedCellValue) > String(filterValue);
      return Number(cellValue) > Number(filterValue);
    case "gte":
      if (field.type === "date")
        return String(normalizedCellValue) >= String(filterValue);
      return Number(cellValue) >= Number(filterValue);
    case "lt":
      if (field.type === "date")
        return String(normalizedCellValue) < String(filterValue);
      return Number(cellValue) < Number(filterValue);
    case "lte":
      if (field.type === "date")
        return String(normalizedCellValue) <= String(filterValue);
      return Number(cellValue) <= Number(filterValue);
    default:
      return true;
  }
}
