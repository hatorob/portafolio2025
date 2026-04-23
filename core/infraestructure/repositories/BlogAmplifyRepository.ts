import { apiSyncService } from "../api/apySync.service";
import { BlogRepository } from '../../domain/repositories/BlogRepository';

export class BlogAmplifyRepository implements BlogRepository {
  async getAll() {
    return await apiSyncService.getAll("Blog");
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