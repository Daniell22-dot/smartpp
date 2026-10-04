import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { logger } from "./utils/logger";
import authRouter from "./auth/auth.router";
import categoriesRouter from "./categories/categories.router";
import productsRouter from "./products/products.router";
import productVariantsRouter from "./productvariants/product-variants.router";
import subscribersRouter from "./subscribers/subscribers.router";
import inquiriesRouter from "./inquiries/inquiries.router";
import addressesRouter from "./addresses/addresses.router";
import wishlistRouter from "./wishlist/wishlist.router";
import cartRouter from "./cart/cart.router";
import couponsRouter from "./coupons/coupons.router";
import ordersRouter from "./orders/orders.router";
import reviewsRouter from "./reviews/reviews.router";
import paymentsRouter from "./payments/payment.router";
import usersRouter from "./users/users.router";
import adminsRouter from "./admins/admins.router";
import staffRouter from "./staff/staff.router";
import pickupStationsRouter from "./pickup-stations/pickup-stations.router";
import sitemapRouter from "./sitemap/sitemap.router";

dotenv.config();

const requiredEnv = [
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "Database_URL",
  "FRONTEND_URL",
  "EMAIL_USER",
  "EMAIL_PASSWORD",
];

const missingEnv = requiredEnv.filter((key) => !process.env[key] || process.env[key].trim() === "");

if (missingEnv.length > 0) {
  logger.error({ missingEnv }, "Missing required environment variables");
  process.exit(1);
}

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const PORT = Number(process.env.PORT) || 5000;

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      { method: req.method, url: req.originalUrl, status: res.statusCode, duration, ip: req.ip },
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });
  next();
});

app.use("/api/auth", authLimiter, authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/product-variants", productVariantsRouter);
app.use("/api/subscribers", subscribersRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupons", couponsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/users", usersRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/staff", staffRouter);
app.use("/api/pickup-stations", pickupStationsRouter);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Dynamic sitemap
app.use(sitemapRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running",
  });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({ err, stack: err.stack }, "Unhandled error");
  const status = err.statusCode || 500;
  const message = process.env.NODE_ENV === "production"
    ? "An unexpected error occurred"
    : (err.message || "Internal server error");
  res.status(status).json({ success: false, message });
});

export default app;