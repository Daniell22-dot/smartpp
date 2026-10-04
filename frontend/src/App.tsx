import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import WishlistPage from "./pages/WishlistPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgetPassword";
import VerifyCode from "./pages/auth/VerifyCode";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

import Error from "./components/error/Error";
import { RequireAuth, RequireRole } from "./components/guards";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import { DashboardStatSkeleton } from "./components/skeletons";
import "./styles/styles.css";

const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard/AdminDashboard"));
const AdminDashboardOverview = lazy(() => import("./pages/dashboard/AdminDashboard/admindashboard/AdminDashboardOverview"));
const Products = lazy(() => import("./pages/dashboard/AdminDashboard/products/Products"));
const CreateProduct = lazy(() => import("./pages/dashboard/AdminDashboard/products/CreateProduct"));
const EditProduct = lazy(() => import("./pages/dashboard/AdminDashboard/products/EditProduct"));
const Categories = lazy(() => import("./pages/dashboard/AdminDashboard/categories/Categories"));
const CreateCategory = lazy(() => import("./pages/dashboard/AdminDashboard/categories/CreateCategory"));
const EditCategory = lazy(() => import("./pages/dashboard/AdminDashboard/categories/EditCategory"));
const Orders = lazy(() => import("./pages/dashboard/AdminDashboard/orders/Orders"));
const Reviews = lazy(() => import("./pages/dashboard/AdminDashboard/reviews/Reviews"));
const Coupons = lazy(() => import("./pages/dashboard/AdminDashboard/coupons/Coupons"));
const Inquiries = lazy(() => import("./pages/dashboard/AdminDashboard/inquiries/Inquiries"));
const Analytics = lazy(() => import("./pages/dashboard/AdminDashboard/analytics/Analytics"));
const Reports = lazy(() => import("./pages/dashboard/AdminDashboard/reports/Reports"));
const ManageUsers = lazy(() => import("./pages/dashboard/AdminDashboard/manage-users/ManageUsers"));
const ManageStaff = lazy(() => import("./pages/dashboard/AdminDashboard/manage-staff/ManageStaff"));
const ManageAdmins = lazy(() => import("./pages/dashboard/AdminDashboard/manage-admins/ManageAdmins"));
const PickupStations = lazy(() => import("./pages/dashboard/AdminDashboard/pickup-stations/PickupStations"));
const CreatePickupStation = lazy(() => import("./pages/dashboard/AdminDashboard/pickup-stations/CreatePickupStation"));
const EditPickupStation = lazy(() => import("./pages/dashboard/AdminDashboard/pickup-stations/EditPickupStation"));
const Payments = lazy(() => import("./pages/dashboard/AdminDashboard/payments/Payments"));

const StaffDashboard = lazy(() => import("./pages/dashboard/StaffDashboard/StaffDashboard"));
const StaffDashboardOverview = lazy(() => import("./pages/dashboard/StaffDashboard/staffdashboard/StaffDashboardOverview"));
const StaffProducts = lazy(() => import("./pages/dashboard/StaffDashboard/products/Products"));
const StaffCategories = lazy(() => import("./pages/dashboard/StaffDashboard/categories/Categories"));
const StaffOrders = lazy(() => import("./pages/dashboard/StaffDashboard/orders/Orders"));
const StaffReviews = lazy(() => import("./pages/dashboard/StaffDashboard/reviews/Reviews"));
const StaffCoupons = lazy(() => import("./pages/dashboard/StaffDashboard/coupons/Coupons"));
const StaffInquiries = lazy(() => import("./pages/dashboard/StaffDashboard/inquiries/Inquiries"));
const StaffPickupStations = lazy(() => import("./pages/dashboard/StaffDashboard/pickup-stations/PickupStations"));

const DashboardLoading = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", padding: "1.5rem" }}>
    {[1,2,3,4].map(i => <div key={i}><div style={{ height: "1.5rem", width: "80px", background: "linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%); background-size: 200% 100%; border-radius: 4px; animation: skeleton-pulse 1.5s ease-in-out infinite" }} /><div style={{ height: "2rem", width: "100px", background: "linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%); background-size: 200% 100%; border-radius: 4px; animation: skeleton-pulse 1.5s ease-in-out infinite; margin-top: 0.5rem" }} /></div>)
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      ),
      errorElement: <Error />,
    },
    {
      path: "/shop",
      element: (
        <ErrorBoundary>
          <ShopPage />
        </ErrorBoundary>
      ),
    },
    {
      path: "/category/:slug",
      element: (
        <ErrorBoundary>
          <CategoryPage />
        </ErrorBoundary>
      ),
    },
    {
      path: "/product/:slug",
      element: (
        <ErrorBoundary>
          <ProductPage />
        </ErrorBoundary>
      ),
    },
    {
      path: "/cart",
      element: (
        <RequireAuth>
          <ErrorBoundary>
            <CartPage />
          </ErrorBoundary>
        </RequireAuth>
      ),
    },
    {
      path: "/checkout",
      element: (
        <RequireAuth>
          <ErrorBoundary>
            <CheckoutPage />
          </ErrorBoundary>
        </RequireAuth>
      ),
    },
    {
      path: "/account",
      element: (
        <RequireAuth>
          <ErrorBoundary>
            <AccountPage />
          </ErrorBoundary>
        </RequireAuth>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <RequireAuth>
          <ErrorBoundary>
            <WishlistPage />
          </ErrorBoundary>
        </RequireAuth>
      ),
    },
    {
      path: "/track-order",
      element: (
        <ErrorBoundary>
          <OrderTrackingPage />
        </ErrorBoundary>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <ErrorBoundary>
          <PrivacyPolicy />
        </ErrorBoundary>
      ),
    },
    {
      path: "/terms-of-service",
      element: (
        <ErrorBoundary>
          <TermsOfService />
        </ErrorBoundary>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verify-code",
      element: <VerifyCode />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/admin",
      element: (
        <RequireRole allowedRoles={["admin"]}>
          <Suspense fallback={<DashboardLoading />}>
            <AdminDashboard />
          </Suspense>
        </RequireRole>
      ),
      children: [
        { path: "", element: <Navigate to="admindashboard" replace /> },
        { path: "admindashboard", element: <Suspense fallback={<DashboardLoading />}><AdminDashboardOverview /></Suspense> },
        { path: "products", element: <Suspense fallback={<DashboardLoading />}><Products /></Suspense> },
        { path: "products/create", element: <Suspense fallback={<DashboardLoading />}><CreateProduct /></Suspense> },
        { path: "products/edit/:id", element: <Suspense fallback={<DashboardLoading />}><EditProduct /></Suspense> },
        { path: "categories", element: <Suspense fallback={<DashboardLoading />}><Categories /></Suspense> },
        { path: "categories/create", element: <Suspense fallback={<DashboardLoading />}><CreateCategory /></Suspense> },
        { path: "categories/edit/:id", element: <Suspense fallback={<DashboardLoading />}><EditCategory /></Suspense> },
        { path: "orders", element: <Suspense fallback={<DashboardLoading />}><Orders /></Suspense> },
        { path: "payments", element: <Suspense fallback={<DashboardLoading />}><Payments /></Suspense> },
        { path: "reviews", element: <Suspense fallback={<DashboardLoading />}><Reviews /></Suspense> },
        { path: "coupons", element: <Suspense fallback={<DashboardLoading />}><Coupons /></Suspense> },
        { path: "pickup-stations", element: <Suspense fallback={<DashboardLoading />}><PickupStations /></Suspense> },
        { path: "pickup-stations/create", element: <Suspense fallback={<DashboardLoading />}><CreatePickupStation /></Suspense> },
        { path: "pickup-stations/edit/:id", element: <Suspense fallback={<DashboardLoading />}><EditPickupStation /></Suspense> },
        { path: "manage-users", element: <Suspense fallback={<DashboardLoading />}><ManageUsers /></Suspense> },
        { path: "manage-staff", element: <Suspense fallback={<DashboardLoading />}><ManageStaff /></Suspense> },
        { path: "manage-admins", element: <Suspense fallback={<DashboardLoading />}><ManageAdmins /></Suspense> },
        { path: "inquiries", element: <Suspense fallback={<DashboardLoading />}><Inquiries /></Suspense> },
        { path: "analytics", element: <Suspense fallback={<DashboardLoading />}><Analytics /></Suspense> },
        { path: "reports", element: <Suspense fallback={<DashboardLoading />}><Reports /></Suspense> },
      ]
    },
    {
      path: "/staff",
      element: (
        <RequireRole allowedRoles={["staff", "admin"]}>
          <Suspense fallback={<DashboardLoading />}>
            <StaffDashboard />
          </Suspense>
        </RequireRole>
      ),
      children: [
        { path: "", element: <Navigate to="staffdashboard" replace /> },
        { path: "staffdashboard", element: <Suspense fallback={<DashboardLoading />}><StaffDashboardOverview /></Suspense> },
        { path: "products", element: <Suspense fallback={<DashboardLoading />}><StaffProducts /></Suspense> },
        { path: "categories", element: <Suspense fallback={<DashboardLoading />}><StaffCategories /></Suspense> },
        { path: "orders", element: <Suspense fallback={<DashboardLoading />}><StaffOrders /></Suspense> },
        { path: "reviews", element: <Suspense fallback={<DashboardLoading />}><StaffReviews /></Suspense> },
        { path: "coupons", element: <Suspense fallback={<DashboardLoading />}><StaffCoupons /></Suspense> },
        { path: "inquiries", element: <Suspense fallback={<DashboardLoading />}><StaffInquiries /></Suspense> },
        { path: "pickup-stations", element: <Suspense fallback={<DashboardLoading />}><StaffPickupStations /></Suspense> },
      ]
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;