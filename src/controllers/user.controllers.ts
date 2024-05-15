import { Request, Response } from "express";
import User from "../model/user.model";

export const getAllUserController = async (req: Request, res: Response) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;

  let filter: any = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }

  const allUsers = await User.find(filter).skip(skip).limit(limit);
  const totalUser = await User.countDocuments(filter);
  const totalPages = Math.ceil(totalUser / limit);

  if (page > totalPages) {
    return res.status(404).json({
      status: 404,
      message: "Page not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "User data retrieved successfully",
    page,
    limit,
    totalUser,
    data: allUsers,
  });
};

export const getUserController = async (req: Request, res: Response) => {
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
};

export const createUserController = async (req: Request, res: Response) => {
  const user = new User(req.body);
  const savedUser = await user.save();

  res.status(200).json({
    status: 200,
    message: "User created successfully",
    data: savedUser,
  });
};

export const updateUserController = async (req: Request, res: Response) => {
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
};

export const deleteUserController = async (req: Request, res: Response) => {
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
};
