import { Router } from "express";
import multer from "multer";
import {
  getAllCategoriesController,
  getActiveCategoriesController,
  getRootCategoriesController,
  getSubcategoriesController,
  getCategoryByIdController,
  getCategoryBySlugController,
  searchCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  toggleCategoryStatusController,
  bulkDeleteCategoriesController
} from "./categories.controller";
import { authenticate, adminRoleAuth } from "../middleware/auth.middleware";

const categoriesRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

categoriesRouter.get("/", getAllCategoriesController);
categoriesRouter.get("/active", getActiveCategoriesController);
categoriesRouter.get("/root", getRootCategoriesController);
categoriesRouter.get("/subcategories/:parentId", getSubcategoriesController);
categoriesRouter.get("/slug/:slug", getCategoryBySlugController);
categoriesRouter.get("/search", searchCategoriesController);
categoriesRouter.get("/:id", getCategoryByIdController);

categoriesRouter.use(authenticate, adminRoleAuth);

categoriesRouter.post("/", upload.single("photo"), createCategoryController);
categoriesRouter.put("/:id", upload.single("photo"), updateCategoryController);
categoriesRouter.delete("/:id", deleteCategoryController);
categoriesRouter.patch("/:id/toggle-status", toggleCategoryStatusController);
categoriesRouter.post("/bulk-delete", bulkDeleteCategoriesController);

export default categoriesRouter;