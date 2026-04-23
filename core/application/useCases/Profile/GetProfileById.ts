import { ProfileRepository } from '../../../domain/repositories/ProfileRepository';

export class GetProfileById {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(id: string) {
    return await this.profileRepository.getById(id);
  }
}