// src/categories/categories.controller.ts
import { Request, Response, NextFunction } from "express";
import { categoriesService } from "./categories.service";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

export const getAllCategoriesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoriesService.getAll();
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const getActiveCategoriesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoriesService.getActive();
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const getRootCategoriesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await categoriesService.getRootCategories();
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const getSubcategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parentId = req.params.parentId;
    if (!parentId || typeof parentId !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid parent ID" });
    }
    const data = await categoriesService.getSubcategories(parseInt(parentId, 10));
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const getCategoryByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    const data = await categoriesService.getById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const getCategoryBySlugController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug;
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid slug" });
    }
    const data = await categoriesService.getBySlug(slug);
    if (!data) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const searchCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }
    const searchTerm = Array.isArray(q) ? q[0] : q;
    if (!searchTerm) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }
    const data = await categoriesService.search(searchTerm as string);
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = { ...req.body };
    if (req.file) {
      body.photo = await uploadToCloudinary(req.file.buffer);
    }
    const data = await categoriesService.create(body);
    res.status(201).json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    const body = { ...req.body };

    if (req.file) {
      body.photo = await uploadToCloudinary(req.file.buffer);
    }

    const cleanData: any = {};
    const allowedFields = ['name', 'slug', 'description', 'icon', 'photo', 'parentId', 'displayOrder', 'isActive'];
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined && body[field] !== '') {
        cleanData[field] = body[field];
      }
    });

    if (cleanData.parentId !== undefined) {
      cleanData.parentId = cleanData.parentId ? parseInt(cleanData.parentId) : null;
    }
    if (cleanData.displayOrder !== undefined) {
      cleanData.displayOrder = parseInt(cleanData.displayOrder) || 0;
    }
    if (cleanData.isActive !== undefined) {
      cleanData.isActive = cleanData.isActive === 'true' || cleanData.isActive === true;
    }

    const data = await categoriesService.update(id, cleanData);
    if (!data) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data });
  } catch (e: any) {
    next(e);
  }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    const data = await categoriesService.delete(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data });
  } catch (e: any) {
    console.error("Delete category error:", e);
    next(e);
  }
};

export const toggleCategoryStatusController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }
    const data = await categoriesService.toggleStatus(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({
      success: true,
      message: `Category ${data.isActive ? 'activated' : 'deactivated'} successfully`,
      data
    });
  } catch (e: any) {
    next(e);
  }
};

export const bulkDeleteCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of category IDs to delete"
      });
    }
    const data = await categoriesService.bulkDelete(ids);
    res.json({
      success: true,
      message: `Successfully deleted ${data.success.length} categories`,
      data
    });
  } catch (e: any) {
    next(e);
  }
};