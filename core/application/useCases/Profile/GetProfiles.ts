import { ProfileRepository } from '../../../domain/repositories/ProfileRepository';

export class GetProfiles {
  constructor(private profilesRepository: ProfileRepository) {}

  async execute() {
    return await this.profilesRepository.getAll();
  }
}