import { BlogRepository } from '../../../domain/repositories/BlogRepository';

export class CreateBlog {
  constructor(private blogRepository: BlogRepository) {}

  async execute(blog: any) {
    return await this.blogRepository.create(blog);
  }
}