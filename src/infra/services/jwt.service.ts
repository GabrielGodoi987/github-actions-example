import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../consts/env-variables.consts'

export type JwtPayload = { userId: string; email: string }

export class JwtService {
  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' })
  }

  static verify(token: string): JwtPayload {
    return jwt.verify(token, SECRET_KEY) as JwtPayload
  }
}
