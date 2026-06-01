import { PostEntity } from '../../domain/entities/post.entity'
import { PostRepository } from '../../domain/repositories/post.repository'

export class CreatePostUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(title: string, content: string, userId: string): Promise<PostEntity> {
    const now = new Date()
    const post = new PostEntity(title, content, userId, now, now)
    return this.postRepo.create(post)
  }
}
