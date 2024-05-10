import { Request, Response } from "express";
import { Category } from "../model/category.model";

export const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryData = await Category.find();
    res.status(200).json({
      status: 200,
      message: "Category Data successfulll",
      total: categoryData.length,
      data: categoryData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const getCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryData = await Category.findById(req.params.categoryId);
    res.status(200).json({
      status: 200,
      message: "Category data successfulll",
      data: categoryData,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const createCategoryController = (req: Request, res: Response) => {
  try {
    const instance = new Category(req.body);
    // @ts-ignore
    instance
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
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message || "Internal server error",
    });
  }
};
