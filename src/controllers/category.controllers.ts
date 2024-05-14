import { Request, Response } from "express";
import Category from "../model/category.model";
import Post from "../model/post.model";

export const getAggregate = async (req: Request, res: Response) => {
  // try {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const demoData = await Post.aggregate([
    {
      $lookup: {
        from: "users", // Name of the User collection
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        "user.status": true,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: Number(limit),
    },
    // {
    //   $project: {
    //     "user.status": 0, // Exclude status field from the user object
    //   },
    // },
  ]);

  const totalDemo = await Post.aggregate([
    {
      $lookup: {
        from: "users", // Name of the User collection
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $match: {
        "user.status": true,
      },
    },
  ]);
  const totalPages = Math.ceil(totalDemo.length / limit);
  console.log(totalPages, page);

  if (page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: "Category page not found",
    });
  }

  return res.json({
    total: totalDemo.length,
    limit,
    page,
    data: demoData,
  });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({
  //     status: 500,
  //     message: "Someting went wroung",
  //     error: err,
  //   });
  // }
};

export const getAllCategoryController = async (req: Request, res: Response) => {
  // try {
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
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({
  //     status: 500,
  //     message: "Someting went wroung",
  //     error: err,
  //   });
  // }
};

export const getCategoryController = async (req: Request, res: Response) => {
  // try {
  const categoryData = await Category.findById(req.params.categoryId);
  res.status(200).json({
    status: 200,
    message: "Category data successfulll",
    data: categoryData,
  });
  // } catch (err) {
  //   console.log({ err });
  //   res.status(500).json({
  //     status: 500,
  //     message: "Someting went wroung",
  //     error: err,
  //   });
  // }
};

export const createCategoryController = (req: Request, res: Response) => {
  // try {
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
  // } catch (err) {
  //   console.log({ err });
  //   res.status(500).json({
  //     status: 500,
  //     message: "Someting went wroung",
  //     error: err,
  //   });
  // }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  // try {
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
  // } catch (err) {
  //   console.log({ err });
  //   res.status(500).json({
  //     status: 500,
  //     message: "Someting went wroung",
  //     error: err,
  //   });
  // }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  // try {
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
  // } catch (error: any) {
  //   console.error("Error deleting user:", error);

  //   return res.status(500).json({
  //     status: 500,
  //     message: "Something went wrong",
  //     error: error.message || "Internal server error",
  //   });
  // }
};
