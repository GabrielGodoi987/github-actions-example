import { Router } from "express";
import { LoginUseCase } from "../application/auth/login.use-case";
import { DrizzleUserRepository } from "../infra/database/repositories/user.repository";
import { AuthController } from "../interface/controllers/auth.controller";

const userRepo = new DrizzleUserRepository();
const loginUseCase = new LoginUseCase(userRepo);
const authController = new AuthController(loginUseCase);

export const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
