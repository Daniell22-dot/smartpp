import { Router } from "express";
import {
  getAllReviewsController,
  getPendingReviewsController,
  getReviewByIdController,
  getProductReviewsController,
  getUserReviewsController,
  createReviewController,
  approveReviewController,
  rejectReviewController,
  markReviewHelpfulController,
  deleteReviewController,
  bulkDeleteReviewsController
} from "./reviews.controller";
import { authenticate, adminRoleAuth, customerRoleAuth } from "../middleware/auth.middleware";

const reviewsRouter = Router();

reviewsRouter.get("/", getAllReviewsController);
reviewsRouter.get("/pending", getPendingReviewsController);
reviewsRouter.get("/product/:productId", getProductReviewsController);
reviewsRouter.get("/:id", getReviewByIdController);

reviewsRouter.use(authenticate);

reviewsRouter.post("/", customerRoleAuth, createReviewController);
reviewsRouter.get("/user", getUserReviewsController);
reviewsRouter.patch("/:id/helpful", markReviewHelpfulController);

reviewsRouter.use(adminRoleAuth);

reviewsRouter.patch("/:id/approve", approveReviewController);
reviewsRouter.patch("/:id/reject", rejectReviewController);
reviewsRouter.delete("/:id", deleteReviewController);
reviewsRouter.post("/bulk-delete", bulkDeleteReviewsController);

export default reviewsRouter;