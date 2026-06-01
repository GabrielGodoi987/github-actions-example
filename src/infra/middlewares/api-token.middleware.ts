export class ApiTokenMiddleware { 
  public static async verifyToken(req: any, res: any, next: any) {
    const token = req.headers['x-api-token'];
    
    if (!token) {
      return res.status(401).json({ message: 'No API token provided' });
    }

    if (token !== process.env.SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid API token' });
    }

    next();
  }
}