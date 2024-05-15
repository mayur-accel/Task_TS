import { Request, Response } from "express";
import Category from "../model/category.model";
import Post from "../model/post.model";
import User from "../model/user.model";

export const getUserActivePostController = async (
  req: Request,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const userActivePostData = await Post.aggregate([
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
    {
      $project: {
        user: 0, // Exclude status field from the user object
      },
    },
  ]);

  const totalActiveUserPost = await Post.aggregate([
    {
      $lookup: {
        from: "users",
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
  const totalPages = Math.ceil(totalActiveUserPost.length / limit);

  if (page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: "Post page not found",
    });
  }

  return res.json({
    total: totalActiveUserPost.length,
    limit,
    page,
    data: userActivePostData,
  });
};

export const getAllPostController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  let filter: any = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const postData = await Post.find(filter)
    .skip(skip)
    .limit(limit)
    .sort([["createdAt", "descending"]]);
  const totalPost = await Post.countDocuments(filter);
  const totalPages = Math.ceil(totalPost / limit);

  if (page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: "Post page not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Post data successfulll",
    page,
    limit,
    totalPost,
    data: postData,
  });
};

export const getPostController = async (req: Request, res: Response) => {
  const postData = await Post.findById(req.params.postId);
  res
    .status(200)
    .json({ status: 200, message: "Post data successfulll", data: postData });
};

export const createPostController = async (req: Request, res: Response) => {
  if (req.body.userId) {
    const userData = await User.findById(req.body.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ status: 404, message: "User id not found" });
    }

    if (req.body.categoryId) {
      const categoryData = await Category.findById(req.body.categoryId);
      if (!categoryData) {
        return res
          .status(404)
          .json({ status: 404, message: "Category id not found" });
      }

      const instance = new Post(req.body);
      instance
        .save()
        .then((data: any) => {
          res.status(200).json({
            status: 200,
            message: "Post data successfull created",
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
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "Category id is missing" });
    }
  } else {
    return res.status(404).json({ status: 404, message: "User id is missing" });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  const doc = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: 200,
    message: "Post data updated successfull",
    data: doc,
  });
};

export const deletePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const deletedPost = await Post.findOneAndDelete({ _id: postId });

  if (!deletedPost) {
    return res.status(404).json({
      status: 404,
      message: "Post not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Post deleted successfully",
    data: deletedPost,
  });
};
