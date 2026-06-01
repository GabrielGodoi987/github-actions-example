import { NextFunction, Request, Response } from "express";
import {
  LoginUseCase,
  RefreshTokenUseCase,
} from "../../application/auth/login.use-case";

export class AuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private refreshUseCase: RefreshTokenUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const token = await this.loginUseCase.execute(email, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }

      const newToken = await this.refreshUseCase.execute(token);
      res.json({ token: newToken });
    } catch (err) {
      next(err);
    }
  };
}
