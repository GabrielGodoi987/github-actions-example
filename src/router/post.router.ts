import { Router } from 'express'
import { JwtMiddleware } from '../infra/middlewares/jwt.middleware'
import { DrizzlePostRepository } from '../infra/database/repositories/post.repository'
import { CreatePostUseCase } from '../application/posts/create-post.use-case'
import { FindAllPostsUseCase } from '../application/posts/findall-posts.use-case'
import { FindOnePostUseCase } from '../application/posts/findone-post.use-case'
import { UpdatePostUseCase } from '../application/posts/update-post.use-case'
import { DeletePostUseCase } from '../application/posts/delete-post.use-case'
import { PostController } from '../interface/controllers/post.controller'

const postRepo = new DrizzlePostRepository()
const createPostUseCase = new CreatePostUseCase(postRepo)
const findAllPostsUseCase = new FindAllPostsUseCase(postRepo)
const findOnePostUseCase = new FindOnePostUseCase(postRepo)
const updatePostUseCase = new UpdatePostUseCase(postRepo)
const deletePostUseCase = new DeletePostUseCase(postRepo)
const postController = new PostController(
  createPostUseCase,
  findAllPostsUseCase,
  findOnePostUseCase,
  updatePostUseCase,
  deletePostUseCase,
)

export const postRouter = Router()

postRouter.use(JwtMiddleware.authenticate)

postRouter.post('/', postController.create)
postRouter.get('/', postController.findAll)
postRouter.get('/:id', postController.findOne)
postRouter.patch('/:id', postController.update)
postRouter.delete('/:id', postController.delete)
