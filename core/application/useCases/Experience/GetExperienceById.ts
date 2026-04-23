import { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';

export class GetExperienceById {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(id: string) {
    return await this.experienceRepository.getById(id);
  }
}