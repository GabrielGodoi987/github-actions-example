import { NextFunction, Request, Response } from 'express'
import { CreateUserUseCase } from '../../application/user/create-user.use-case'
import { UpdateUserUseCase } from '../../application/user/update-user.use-case'

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' })
      }

      const user = await this.createUserUseCase.execute(name, email, password)
      res.status(201).json({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        createdAt: user.getCreatedAt(),
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const { name, email } = req.body

      const user = await this.updateUserUseCase.execute(id, { name, email })
      res.json({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
      })
    } catch (err) {
      next(err)
    }
  }
}
