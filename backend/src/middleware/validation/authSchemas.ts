import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(255),
    email: z.string().email(),
    phone: z.string().regex(/^[\d\s\+\-]{10,20}$/),
    password: z.string().min(8).max(128),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const verifySchema = z.object({
  body: z.object({
    email: z.string().email(),
    code: z.string().length(6).regex(/^\d+$/),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const verifyResetCodeSchema = z.object({
  body: z.object({
    email: z.string().email(),
    code: z.string().length(6).regex(/^\d+$/),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(128),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1),
  }),
});