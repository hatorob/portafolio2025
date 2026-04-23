import { apiSyncService } from "../api/apySync.service";
import { ExperienceRepository } from '../../domain/repositories/ExperienceRepository';

export class ExperienceAmplifyRepository implements ExperienceRepository {
  async getAll() {
    return await apiSyncService.getAll("Experience");
  }

  async getById(id: string) {
    return await apiSyncService.getById("Experience", id);
  }

  async create(experience: any) {
    return await apiSyncService.create("Experience", experience);
  }

  async update(id: string, experience: any) {
    return await apiSyncService.update("Experience", id, experience);
  }

  async delete(id: string) {
    return await apiSyncService.delete("Experience", id);
  }
  
}