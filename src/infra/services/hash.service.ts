import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

export class HashService {
  static hash(password: string): string {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 64).toString('hex')
    return `${salt}:${hash}`
  }

  static compare(password: string, hashed: string): boolean {
    const [salt, hash] = hashed.split(':')
    const verify = scryptSync(password, salt, 64)
    return timingSafeEqual(verify, Buffer.from(hash, 'hex'))
  }
}
