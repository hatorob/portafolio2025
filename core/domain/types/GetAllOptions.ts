export type SortDirection = "asc" | "desc";

export interface GetAllOptions {
  filter?: any;
  limit?: number;
  orderBy?: {
    field: string;
    direction: SortDirection;
  };
}