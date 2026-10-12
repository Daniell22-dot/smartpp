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
import { validate } from "../middleware/validation/validate";
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

authRouter.post("/register", validate(registerSchema), registerUserController);
authRouter.post("/verify", validate(verifySchema), verifyUserController);
authRouter.post("/login", validate(loginSchema), loginUserController);
authRouter.post("/refresh", validate(refreshTokenSchema), refreshTokenController);
authRouter.post("/forgot-password", validate(forgotPasswordSchema), forgotPasswordController);
authRouter.post("/verify-reset-code", validate(verifyResetCodeSchema), verifyResetCodeController);
authRouter.post("/reset-password", validate(resetPasswordSchema), resetPasswordController);

export default authRouter;