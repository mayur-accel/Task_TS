import { Request, Response } from "express";
import Category from "../model/category.model";

export const getAllCategoryController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  let filter: any = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const categoryData = await Category.find(filter).skip(skip).limit(limit);
  const totalCategory = await Category.countDocuments(filter);
  const totalPages = Math.ceil(totalCategory / limit);

  if (page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: "Category page not found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Category Data successfulll",
    limit,
    page,
    totalCategory,
    data: categoryData,
  });
};

export const getCategoryController = async (req: Request, res: Response) => {
  const categoryData = await Category.findById(req.params.categoryId);
  res.status(200).json({
    status: 200,
    message: "Category data successfulll",
    data: categoryData,
  });
};

export const createCategoryController = (req: Request, res: Response) => {
  const instance = new Category(req.body);
  return instance
    .save()
    .then((data: any) => {
      res.status(200).json({
        status: 200,
        message: "Category data create successfull",
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 400,
        message: "Someting went wroung",
        error: err,
      });
    });
};

export const updateCategoryController = async (req: Request, res: Response) => {
  const doc = await Category.findOneAndUpdate(
    { _id: req.params.categoryId },
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Category data updated successfull",
    data: doc,
  });
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const deletedCategory = await Category.findOneAndDelete({
    _id: categoryId,
  });

  if (!deletedCategory) {
    return res.status(404).json({
      status: 404,
      message: "Category not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Category deleted successfully",
    data: deletedCategory,
  });
};
