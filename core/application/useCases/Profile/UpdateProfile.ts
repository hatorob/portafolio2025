import { ProfileRepository } from '../../../domain/repositories/ProfileRepository';

export class UpdateProfile {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(id: string, profile: any) {
    return await this.profileRepository.update(id, profile);
  }
}