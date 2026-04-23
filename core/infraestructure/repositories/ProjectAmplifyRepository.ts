import { apiSyncService } from "../api/apySync.service";
import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";

export class ProjectAmplifyRepository implements ProjectRepository {
  async getAll() {
    return await apiSyncService.getAll("Project");
  }

  async getById(id: string) {
    return await apiSyncService.getById("Project", id);
  }

  async create(project: any) {
    return await apiSyncService.create("Project", project);
  }

  async update(id: string, project: any) {
    return await apiSyncService.update("Project", id, project);
  }

  async delete(id: string) {
    return await apiSyncService.delete("Project", id);
  }
  
}