import { beforeAll, afterAll, afterEach, vi } from "vitest";

// Mock environment variables for testing
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing-only";
process.env.JWT_REFRESH_SECRET = "test-jwt-refresh-secret-key-for-testing-only";
process.env.Database_URL = "postgresql://test:test@localhost:5432/gmnex_test";
process.env.FRONTEND_URL = "http://localhost:5173";
process.env.EMAIL_USER = "test@example.com";
process.env.EMAIL_PASSWORD = "test-password";
process.env.MPESA_CONSUMER_KEY = "test";
process.env.MPESA_CONSUMER_SECRET = "test";
process.env.MPESA_SHORT_CODE = "test";
process.env.MPESA_PASSKEY = "test";
process.env.MPESA_ENVIRONMENT = "sandbox";
process.env.MPESA_CALLBACK_URL = "http://localhost:5000/api/payments/mpesa/callback";
process.env.SITE_URL = "http://localhost:5173";

// Global test timeout
vi.setConfig({ testTimeout: 10000 });

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});