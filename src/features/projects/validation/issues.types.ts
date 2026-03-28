export type IssueSeverity = "CRITICAL" | "MAJOR" | "MINOR";
export type IssueMatch = "EXACT" | "SEMANTIC" | "MISSING";
export type FileType = "BPMN" | "US" | "INTERVIEW" | "MCD";
export type DataType =
  | "ACTOR"
  | "FLOW"
  | "ACTION"
  | "US"
  | "ENTITY"
  | "RELATION";

export type ParsedDataRef = {
  parsedDataId: string;
  dataType: DataType;
  content: string;
  fileId: string;
  fileName: string;
  fileType: FileType;
};

export type Issue = {
  id: string;
  match: IssueMatch;
  severity: IssueSeverity;
  confidenceScore: number;
  justification: string;
  suggestion: string | null;
  sourceParsedData: ParsedDataRef;
  targetParsedData: ParsedDataRef;
};

export const dataTypeLabel: Record<DataType, string> = {
  ACTOR: "concerning an actor",
  FLOW: "concerning a flow relationship",
  ACTION: "concerning an action",
  US: "concerning a user story",
  ENTITY: "concerning an entity",
  RELATION: "concerning a relation",
};

export const fileTypeDescription: Record<FileType, string> = {
  BPMN: "BPMN diagram file you submitted.",
  US: "User stories you imported from Taiga.",
  INTERVIEW: "Interview file you submitted.",
  MCD: "MCD diagram file you submitted.",
};
