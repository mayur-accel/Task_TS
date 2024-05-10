import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../../controllers/category.controllers";

const CategoryRoute = Router();

CategoryRoute.get("/", getAllCategoryController);

CategoryRoute.get("/:categoryId", getCategoryController);

CategoryRoute.post("/", createCategoryController);

CategoryRoute.patch("/:categoryId", updateCategoryController);

CategoryRoute.delete("/:categoryId", deleteCategoryController);

export default CategoryRoute;
