import { PostEntity } from '../../domain/entities/post.entity'
import { PostRepository } from '../../domain/repositories/post.repository'

export class FindAllPostsUseCase {
  constructor(private postRepo: PostRepository) {}

  async execute(): Promise<PostEntity[]> {
    return this.postRepo.findAll()
  }
}
