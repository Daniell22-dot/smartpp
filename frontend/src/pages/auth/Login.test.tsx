import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { authAPI } from "../../Features/auth/authAPI";

vi.mock("../../Features/auth/authAPI", () => ({
  authAPI: {
    login: vi.fn(),
  },
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
    user: null,
    loading: false,
  }),
}));

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form with email and password fields", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("you@example.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeTruthy();
  });

  it("shows error when email is invalid", async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("you@example.com");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeTruthy();
    });
  });

  it("shows error when password is empty", async () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText("Enter your password");
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeTruthy();
    });
  });

  it("calls authAPI.login on valid submit", async () => {
    vi.mocked(authAPI.login).mockResolvedValue({
      success: true,
      data: {
        token: "test-token",
        refreshToken: "refresh-token",
        role: "customer",
        dashboard: "customer",
        userId: 1,
        email: "test@example.com",
        fullName: "Test User",
      },
      redirect: "/",
    } as never);

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});
