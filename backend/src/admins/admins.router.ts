import { Router } from "express";
import {
  getAllAdminsController,
  getAdminByIdController,
  createAdminController,
  deleteAdminController,
  bulkDeleteAdminsController
} from "./admins.controller";
import { authenticate, adminRoleAuth } from "../middleware/auth.middleware";

const adminsRouter = Router();

adminsRouter.use(authenticate, adminRoleAuth);

adminsRouter.get("/", getAllAdminsController);
adminsRouter.get("/:id", getAdminByIdController);
adminsRouter.post("/", createAdminController);
adminsRouter.delete("/:id", deleteAdminController);
adminsRouter.post("/bulk-delete", bulkDeleteAdminsController);

export default adminsRouter;