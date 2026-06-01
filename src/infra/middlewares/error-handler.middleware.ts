import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err)

  const statusCode =
    err.name === 'UserNotFoundError' || err.name === 'PostNotFoundError' ? 404 :
    err.name === 'UserAlreadyExistsError' ? 409 :
    err.name === 'InvalidEmailError' || err.name === 'InvalidPasswordError' ? 400 :
    err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError' ? 401 :
    500

  res.status(statusCode).json({
    error: err.message,
  })
}
