import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import db from "../Drizzle/db";
import { sessions } from "../Drizzle/schema";
import { eq, and, gt } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const checkRoles = (requiredRole: "admin" | "staff" | "customer") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string; email: string };
      (req as any).user = decoded;

      if (decoded.role === requiredRole) {
        next();
        return;
      }
      res.status(401).json({ message: "Unauthorized" });
      return;
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }
  };
};

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string; email: string };
    const session = await db.query.sessions.findFirst({
      where: and(eq(sessions.userId, decoded.userId), gt(sessions.expiresAt, new Date())),
    });
    if (!session) {
      res.status(401).json({ message: "Session expired or invalid" });
      return;
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};

export const adminRoleAuth = checkRoles("admin");
export const staffRoleAuth = checkRoles("staff");
export const customerRoleAuth = checkRoles("customer");