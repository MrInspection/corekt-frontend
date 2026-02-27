import { useCallback, useState } from "react";
import {
  type ActiveFilter,
  type FilterField,
  type FilterOperatorId,
  type FilterValue,
  OPERATORS_BY_FIELD_TYPE,
} from "@/features/shared/advanced-filter/filters.type";

let nextId = 0;
function generateFilterId() {
  return `filter-${++nextId}`;
}

export function useFilterState(initialFilters: ActiveFilter[] = []) {
  const [filters, setFilters] = useState<ActiveFilter[]>(initialFilters);

  const addFilter = useCallback((fieldId: string, fields: FilterField[]) => {
    const field = fields.find((f) => f.id === fieldId);
    if (!field) return;

    const defaultOperator = OPERATORS_BY_FIELD_TYPE[field.type][0];

    setFilters((prev) => [
      ...prev,
      {
        id: generateFilterId(),
        fieldId,
        operator: defaultOperator,
        value: null,
      },
    ]);
  }, []);

  const updateFilterOperator = useCallback(
    (filterId: string, operator: FilterOperatorId) => {
      setFilters((prev) =>
        prev.map((filter) => {
          if (filter.id !== filterId) return filter;
          return { ...filter, operator };
        }),
      );
    },
    [],
  );

  const updateFilterValue = useCallback(
    (filterId: string, value: FilterValue) => {
      setFilters((prev) =>
        prev.map((f) => (f.id === filterId ? { ...f, value } : f)),
      );
    },
    [],
  );

  const removeFilter = useCallback((filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId));
  }, []);

  const clearFilters = useCallback(() => setFilters([]), []);

  return {
    filters,
    addFilter,
    updateFilterOperator,
    updateFilterValue,
    removeFilter,
    clearFilters,
  };
}
