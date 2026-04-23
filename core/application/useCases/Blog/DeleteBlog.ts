import { BlogRepository } from '../../../domain/repositories/BlogRepository';

export class DeleteBlog {
  constructor(private blogRepository: BlogRepository) {}

  async execute(id: string) {
    return await this.blogRepository.delete(id);
  }
}