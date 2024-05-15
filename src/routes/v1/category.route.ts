import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../../controllers/category.controllers";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const CategoryRoute = Router();

CategoryRoute.get("/", asyncMiddleware(getAllCategoryController));

CategoryRoute.get("/:categoryId", asyncMiddleware(getCategoryController));

CategoryRoute.post("/", asyncMiddleware(createCategoryController));

CategoryRoute.patch("/:categoryId", asyncMiddleware(updateCategoryController));

CategoryRoute.delete("/:categoryId", asyncMiddleware(deleteCategoryController));

export default CategoryRoute;
