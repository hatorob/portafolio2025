import { ExperienceRepository } from '../../../domain/repositories/ExperienceRepository';

export class UpdateExperience {
  constructor(private experienceRepository: ExperienceRepository) {}

  async execute(id: string, experience: any) {
    return await this.experienceRepository.update(id, experience);
  }
}