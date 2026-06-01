import { PostNotFoundError } from '../../domain/domain-exceptions/posts.exceptions'
import { PostRepository } from '../../domain/repositories/post.repository'

export class DeletePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.postRepo.findById(id)
    if (!existing) {
      throw new PostNotFoundError(id)
    }

    await this.postRepo.delete(id)
  }
}
