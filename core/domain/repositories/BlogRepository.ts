import type { GetAllOptions } from "../types/GetAllOptions";

export interface BlogRepository {
  getAll(options?: GetAllOptions): Promise<any[]>;
  getById(id: string): Promise<any | null>;
  create(project: any): Promise<any>;
  update(id: string, project: any): Promise<any>;
  delete(id: string): Promise<any>;
}