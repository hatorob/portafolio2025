import { apiSyncService } from "../api/apySync.service";
import type { ExperienceRepository } from '../../domain/repositories/ExperienceRepository';
import type { GetAllOptions } from "../../domain/types/GetAllOptions";

export class ExperienceAmplifyRepository implements ExperienceRepository {
  async getAll(options?: GetAllOptions) {
    return await apiSyncService.getAll("Experience",options);
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