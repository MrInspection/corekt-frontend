import {
  CalendarIcon,
  CheckIcon,
  CircleAlertIcon,
  CircleDot,
  ClockIcon,
  GitBranch,
  Loader,
  OctagonX,
  SquareCheck,
  TagIcon,
  TextIcon,
  XIcon,
} from "lucide-react";
import type { FilterField } from "@/features/shared/advanced-filter/filters.type";

export const PROJECT_FILTER_FIELDS: FilterField[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "totalVersions",
    label: "Number of versions",
    type: "number",
    icon: <GitBranch className="size-3.5" />,
  },
  {
    id: "date",
    label: "Creation Date",
    type: "date",
    icon: <CalendarIcon className="size-3.5" />,
  },
];

export const VERSION_FILTER_FIELDS: FilterField[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "status",
    label: "Status",
    type: "enum",
    icon: <TagIcon className="size-3.5" />,
    options: [
      {
        value: "draft",
        label: "Draft",
        icon: <ClockIcon className="size-3.5" />,
      },
      {
        value: "in-progress",
        label: "In progress",
        icon: <Loader className="size-3.5" />,
      },
      {
        value: "completed",
        label: "Completed",
        icon: <CheckIcon className="size-3.5" />,
      },
      {
        value: "failed",
        label: "Failed",
        icon: <XIcon className="size-3.5" />,
      },
    ],
  },
  {
    id: "date",
    label: "Creation Date",
    type: "date",
    icon: <CalendarIcon className="size-3.5" />,
  },
];

export const ISSUE_FILTER_FIELDS: FilterField[] = [
  {
    id: "title",
    label: "Title",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "content",
    label: "Content",
    type: "text",
    icon: <TextIcon className="size-3.5" />,
  },
  {
    id: "confidenceScore",
    label: "Confiendence Score",
    type: "number",
    icon: <SquareCheck className="size-3.5" />,
  },
  {
    id: "severity",
    label: "Severity",
    type: "enum",
    icon: <TagIcon className="size-3.5" />,
    options: [
      {
        value: "minor",
        label: "Minor",
        icon: <CircleDot className="size-3.5" />,
      },
      {
        value: "major",
        label: "Major",
        icon: <CircleAlertIcon className="size-3.5" />,
      },
      {
        value: "critical",
        label: "Critical",
        icon: <OctagonX className="size-3.5" />,
      },
    ],
  },
];
