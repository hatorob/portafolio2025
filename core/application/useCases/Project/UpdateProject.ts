import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";

export class UpdateProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: string, project: any) {
    return await this.projectRepository.update(id, project);
  }
}