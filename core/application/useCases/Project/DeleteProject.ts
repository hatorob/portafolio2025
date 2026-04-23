import type { ProjectRepository } from "../../../domain/repositories/ProjectRepository";

export class DeleteProject {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(id: string) {
    return await this.projectRepository.delete(id);
  }
}