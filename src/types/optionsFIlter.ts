export type SortDirection = "asc" | "desc";

export interface OptionsFilter {
  filter?: any;
  limit?: number;
  orderBy?: {
    field: string;
    direction: SortDirection;
  };
}