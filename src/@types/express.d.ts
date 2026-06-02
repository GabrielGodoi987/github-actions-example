declare global {
  namespace Express {
    interface Request {
      user?: { userName: string; email: string; sub: string; iat: number }
    }
  }
}

export { };

