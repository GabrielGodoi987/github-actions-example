import { Request, Response, NextFunction } from 'express'
import { JwtService } from '../services/jwt.service'

export class JwtMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization

    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const token = header.split(' ')[1]

    try {
      req.user = JwtService.verify(token)
      next()
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' })
    }
  }
}
