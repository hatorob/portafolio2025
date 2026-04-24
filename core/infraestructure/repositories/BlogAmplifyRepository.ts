import { apiSyncService } from "../api/apySync.service";
import type { BlogRepository } from '../../domain/repositories/BlogRepository';
import type { GetAllOptions } from "../../domain/types/GetAllOptions";

export class BlogAmplifyRepository implements BlogRepository {
  async getAll(options?: GetAllOptions) {
    return await apiSyncService.getAll("Blog",options);
  }

  async getById(id: string) {
    return await apiSyncService.getById("Blog", id);
  }

  async create(blog: any) {
    return await apiSyncService.create("Blog", blog);
  }

  async update(id: string, blog: any) {
    return await apiSyncService.update("Blog", id, blog);
  }

  async delete(id: string) {
    return await apiSyncService.delete("Blog", id);
  }
  
}