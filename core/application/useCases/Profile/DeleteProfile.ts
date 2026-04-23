import { ProfileRepository } from '../../../domain/repositories/ProfileRepository';

export class DeleteProfile {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(id: string) {
    return await this.profileRepository.delete(id);
  }
}