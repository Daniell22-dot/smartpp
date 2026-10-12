import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import authRouter from "./auth.router";
import * as authService from "./auth.service";

vi.mock("./auth.service", () => ({
  registerService: vi.fn(),
  verifyService: vi.fn(),
  loginService: vi.fn(),
  forgotPasswordService: vi.fn(),
  verifyResetCodeService: vi.fn(),
  resetPasswordService: vi.fn(),
  refreshService: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);

describe("Auth API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should reject invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Test User",
          email: "invalid-email",
          phone: "0712345678",
          password: "Password123!",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("email");
    });

    it("should reject short password", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Test User",
          email: "test@example.com",
          phone: "0712345678",
          password: "short",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("password");
    });

    it("should accept valid registration data", async () => {
      vi.mocked(authService.registerService).mockResolvedValue(undefined as never);

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: "Test User",
          email: `test${Date.now()}@example.com`,
          phone: "0712345678",
          password: "Password123!",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(authService.registerService).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should reject invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "invalid-email",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("email");
    });

    it("should reject empty password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("password");
    });

    it("should log in with valid credentials", async () => {
      vi.mocked(authService.loginService).mockResolvedValue({
        token: "test-token",
        refreshToken: "refresh-token",
        role: "customer",
        dashboard: "customer",
        userId: 1,
        email: "test@example.com",
        fullName: "Test User",
      } as never);

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: "password123",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBe("test-token");
    });
  });

  describe("POST /api/auth/refresh", () => {
    it("should reject missing refresh token", async () => {
      const response = await request(app)
        .post("/api/auth/refresh")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message.toLowerCase()).toContain("refresh");
    });
  });
});
