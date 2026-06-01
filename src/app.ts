import { config } from "dotenv";
import express from "express";

config({
  debug: true,
});

import { errorHandler } from "./infra/middlewares/error-handler.middleware";
import { swaggerRouter } from "./infra/swagger/swagger.router";
import { authRouter } from "./router/auth.router";
import { postRouter } from "./router/post.entity";
import { userRouter } from "./router/user.router";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./infra/swagger/swagger";
import { bootStrapApplication } from "./infra/webserver/server";

export const app = express();

app.use(express.json());

app.use(errorHandler);

swaggerRouter.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Simple Application API",
  }),
);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/docs.json", swaggerRouter);

bootStrapApplication().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
