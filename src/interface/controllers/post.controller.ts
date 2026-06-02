import { NextFunction, Request, Response } from 'express'
import { CreatePostUseCase } from '../../application/posts/create-post.use-case'
import { DeletePostUseCase } from '../../application/posts/delete-post.use-case'
import { FindAllPostsUseCase } from '../../application/posts/findall-posts.use-case'
import { FindOnePostUseCase } from '../../application/posts/findone-post.use-case'
import { UpdatePostUseCase } from '../../application/posts/update-post.use-case'

export class PostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private findAllPostsUseCase: FindAllPostsUseCase,
    private findOnePostUseCase: FindOnePostUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private deletePostUseCase: DeletePostUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body
      const userId = req.user!.sub

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' })
      }

      const post = await this.createPostUseCase.execute(title, content, userId)
      res.status(201).json({
        id: post.getId(),
        title: post.getTitle(),
        content: post.getContent(),
        userId: post.getUserId(),
        createdAt: post.getCreatedAt(),
      })
    } catch (err) {
      next(err)
    }
  }

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.findAllPostsUseCase.execute()
      res.json(posts.map(p => ({
        id: p.getId(),
        title: p.getTitle(),
        content: p.getContent(),
        userId: p.getUserId(),
        createdAt: p.getCreatedAt(),
        updatedAt: p.getUpdatedAt(),
      })))
    } catch (err) {
      next(err)
    }
  }

 async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const post = await this.findOnePostUseCase.execute(id)
      res.json({
        id: post.getId(),
        title: post.getTitle(),
        content: post.getContent(),
        userId: post.getUserId(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
      })
    } catch (err) {
      next(err)
    }
  }

   async update (req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const { title, content } = req.body

      const post = await this.updatePostUseCase.execute(id, { title, content })
      res.json({
        id: post.getId(),
        title: post.getTitle(),
        content: post.getContent(),
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction){
    try {
      const id = req.params.id as string
      await this.deletePostUseCase.execute(id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
