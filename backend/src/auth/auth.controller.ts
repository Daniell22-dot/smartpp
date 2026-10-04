import { Request, Response, NextFunction } from "express";
import {
  registerService,
  verifyService,
  loginService,
  forgotPasswordService,
  verifyResetCodeService,
  resetPasswordService,
  refreshService
} from "./auth.service";

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, phone, password } = req.body;
    await registerService(fullName, email, phone, password);
    res.json({
      success: true,
      message: "Registration successful. Please check your email for verification code."
    });
  } catch (e: any) {
    next(e);
  }
};

export const verifyUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    await verifyService(email, code);
    res.json({ success: true, message: "Email verified successfully" });
  } catch (e: any) {
    next(e);
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.json({
      success: true,
      data,
      redirect: data.dashboard === "admin" ? "/admin/dashboard" :
                data.dashboard === "staff" ? "/staff/dashboard" : "/"
    });
  } catch (e: any) {
    next(e);
  }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }
    const data = await refreshService(refreshToken);
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    await forgotPasswordService(email);
    res.json({ success: true, message: "Reset code sent to your email" });
  } catch (e: any) {
    next(e);
  }
};

export const verifyResetCodeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    await verifyResetCodeService(email, code);
    res.json({ success: true, message: "Code verified successfully" });
  } catch (e: any) {
    next(e);
  }
};

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    await resetPasswordService(email, password);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (e: any) {
    next(e);
  }
};