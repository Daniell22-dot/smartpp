import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { CartProvider } from "../../components/context/CartContext";
import { WishlistProvider } from "../../components/context/WishlistContext";
import Login from "../pages/auth/Login";
import { authAPI } from "../../Features/auth/authAPI";

vi.mock("../../Features/auth/authAPI");
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    isAuthenticated: false,
    user: null,
    loading: false,
  }),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            {component}
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form with email and password fields", () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows error when email is invalid", async () => {
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);
    
    await vi.waitFor(() => {
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    });
  });

  it("shows error when password is empty", async () => {
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.blur(passwordInput);
    
    await vi.waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("calls authAPI.login on valid submit", async () => {
    const { authAPI } = await import("../../Features/auth/authAPI");
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
    });

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    
    await vi.waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});