import { Router } from "express";
import {
  registerUserController,
  verifyUserController,
  loginUserController,
  forgotPasswordController,
  verifyResetCodeController,
  resetPasswordController,
  refreshTokenController
} from "./auth.controller";
import { validateBody } from "../middleware/validation/validate";
import {
  registerSchema,
  loginSchema,
  verifySchema,
  forgotPasswordSchema,
  verifyResetCodeSchema,
  resetPasswordSchema,
  refreshTokenSchema
} from "../middleware/validation/authSchemas";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerUserController);
authRouter.post("/verify", validateBody(verifySchema), verifyUserController);
authRouter.post("/login", validateBody(loginSchema), loginUserController);
authRouter.post("/refresh", validateBody(refreshTokenSchema), refreshTokenController);
authRouter.post("/forgot-password", validateBody(forgotPasswordSchema), forgotPasswordController);
authRouter.post("/verify-reset-code", validateBody(verifyResetCodeSchema), verifyResetCodeController);
authRouter.post("/reset-password", validateBody(resetPasswordSchema), resetPasswordController);

export default authRouter;