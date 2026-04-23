import { apiSyncService } from "../api/apySync.service";
import { ProfileRepository } from '../../domain/repositories/ProfileRepository';

export class ProfileAmplifyRepository implements ProfileRepository {
  async getAll() {
    return await apiSyncService.getAll("Profile");
  }

  async getById(id: string) {
    return await apiSyncService.getById("Profile", id);
  }

  async create(profile: any) {
    return await apiSyncService.create("Profile", profile);
  }

  async update(id: string, profile: any) {
    return await apiSyncService.update("Profile", id, profile);
  }

  async delete(id: string) {
    return await apiSyncService.delete("Profile", id);
  }
  
}