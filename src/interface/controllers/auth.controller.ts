import { Request, Response, NextFunction } from 'express'
import { LoginUseCase } from '../../application/auth/login.use-case'

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
      }

      const token = await this.loginUseCase.execute(email, password)
      res.json({ token })
    } catch (err) {
      next(err)
    }
  }
}
