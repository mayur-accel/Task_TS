import { Router } from "express";
import { asyncMiddleware } from "../../../utils/asyncMiddleware";
import {
  createCategoryController,
  deleteCategoryController,
  getAggregate,
  getAllCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../../controllers/category.controllers";

const CategoryRoute = Router();

CategoryRoute.get("/", asyncMiddleware(getAllCategoryController));

CategoryRoute.get("/aggregate", asyncMiddleware(getAggregate));

CategoryRoute.get("/:categoryId", asyncMiddleware(getCategoryController));

CategoryRoute.post("/", asyncMiddleware(createCategoryController));

CategoryRoute.patch("/:categoryId", asyncMiddleware(updateCategoryController));

CategoryRoute.delete("/:categoryId", asyncMiddleware(deleteCategoryController));

export default CategoryRoute;
