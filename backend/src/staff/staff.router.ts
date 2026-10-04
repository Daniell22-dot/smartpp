import { Router } from "express";
import {
  getAllStaffController,
  getStaffByIdController,
  createStaffController,
  deleteStaffController,
  bulkDeleteStaffController
} from "./staff.controller";
import { authenticate, adminRoleAuth } from "../middleware/auth.middleware";

const staffRouter = Router();

staffRouter.use(authenticate, adminRoleAuth);

staffRouter.get("/", getAllStaffController);
staffRouter.get("/:id", getStaffByIdController);
staffRouter.post("/", createStaffController);
staffRouter.delete("/:id", deleteStaffController);
staffRouter.post("/bulk-delete", bulkDeleteStaffController);

export default staffRouter;