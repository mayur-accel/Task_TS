import { Request, Response } from "express";
import User from "../model/user.model";

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json({
      status: 200,
      message: "User data retrieved successfully",
      data: allUsers,
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const userData = await User.findById(req.params.userId);
    if (userData) {
      return res.status(200).json({
        status: 200,
        message: "User data successfulll",
        data: userData,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "User not found",
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

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(200).json({
      status: 200,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    if (updatedUser) {
      return res.status(200).json({
        status: 200,
        message: "User data updated successfull",
        data: updatedUser,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: err.message,
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
