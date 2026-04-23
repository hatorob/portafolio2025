import { BlogRepository } from '../../../domain/repositories/BlogRepository';

export class UpdateBlog {
  constructor(private blogRepository: BlogRepository) {}

  async execute(id: string, blog: any) {
    return await this.blogRepository.update(id, blog);
  }
}