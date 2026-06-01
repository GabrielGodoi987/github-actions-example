import { Router } from 'express'
import { DrizzleUserRepository } from '../infra/database/repositories/user.repository'
import { CreateUserUseCase } from '../application/user/create-user.use-case'
import { UpdateUserUseCase } from '../application/user/update-user.use-case'
import { UserController } from '../interface/controllers/user.controller'

const userRepo = new DrizzleUserRepository()
const createUserUseCase = new CreateUserUseCase(userRepo)
const updateUserUseCase = new UpdateUserUseCase(userRepo)
const userController = new UserController(createUserUseCase, updateUserUseCase)

export const userRouter = Router()

userRouter.post('/', userController.create)
userRouter.patch('/:id', userController.update)
