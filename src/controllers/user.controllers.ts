import { Request, Response } from "express";
import User from "../model/user.model";

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ status: 200, message: "User data successfulll", data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userObj = await User.findById(req.params.userId);
    res
      .status(200)
      .json({ status: 200, message: "User data successfulll", data: userObj });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 500,
      message: "Someting went wroung",
      error: err,
    });
  }
};

export const createUserController = (req: Request, res: Response) => {
  try {
    const instance = new User(req.body);
    // @ts-ignore
    instance
      .save()
      .then((data: any) => {
        res.status(200).json({
          status: 200,
          message: "i am created user Controller",
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

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const doc = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: 200,
      message: "User data updated successfull",
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

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User deleted successfully",
      data: deletedUser,
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
