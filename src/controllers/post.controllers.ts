import { Request, Response } from "express";
import { Post } from "../model/post.model";

export const getAllPostController = async (req: Request, res: Response) => {
  try {
    const postData = await Post.find();
    res
      .status(200)
      .json({ status: 200, message: "Post data successfulll", data: postData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const getPostController = async (req: Request, res: Response) => {
  try {
    const postData = await Post.findById(req.params.postId);
    res
      .status(200)
      .json({ status: 200, message: "Post data successfulll", data: postData });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const createPostController = (req: Request, res: Response) => {
  try {
    const instance = new Post(req.body);
    // @ts-ignore
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
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const updatePostController = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const deletePostController = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message || "Internal server error",
    });
  }
};
