import { ProfileRepository } from '../../../domain/repositories/ProfileRepository';

export class CreateProfile {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(profile: any) {
    return await this.profileRepository.create(profile);
  }
}