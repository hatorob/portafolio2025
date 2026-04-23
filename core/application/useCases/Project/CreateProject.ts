import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";

export class CreateProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(project: any) {
    return await this.projectRepository.create(project);
  }
}