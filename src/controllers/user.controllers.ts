import { Request, Response } from "express";
import fs from "fs";
import path from "path";
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

// Ensure the uploads directory exists
const ensureUploadsDirExists = (userId: string) => {
  const dir = path.join(__dirname, "..", "../public", "uploads", userId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = new User(req.body);
  const savedUser = await user.save();

  const userId = savedUser._id.toString(); // Get the userId from the saved user

  let profileImage = "";

  // Step 2: Handle the profile image if it exists
  if (req.file) {
    ensureUploadsDirExists(userId); // Ensure user-specific directory exists

    profileImage = `./../public/uploads/${userId}/${req.file.originalname
      .replace(/\s+/g, "")
      .toLowerCase()}`;
    const uploadPath = path.join(__dirname, "..", profileImage);

    fs.writeFileSync(uploadPath, req.file.buffer);

    // Step 3: Update the user document with the profile image path
    savedUser.profileImage =
      userId + "/" + req.file.originalname.replace(/\s+/g, "").toLowerCase();
    await savedUser.save();
  }

  res.status(200).json({
    status: 200,
    message: "User created successfully",
    data: savedUser,
  });
};

export const updateUserController = async (req: Request, res: Response) => {
  let updatedUser = await User.findById({ _id: req.params.userId });
  if (updatedUser) {
    let profileImage = "";

    let mainData = { ...req.body };

    // Step 2: Handle the profile image if it exists
    if (req.file) {
      const userId = req.params.userId;
      ensureUploadsDirExists(userId); // Ensure user-specific directory exists

      // Check if the user already has a profile image and delete it
      if (updatedUser.profileImage) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "../public",
          "uploads",
          updatedUser.profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const formattedFilename = req.file.originalname
        .replace(/\s+/g, "")
        .toLowerCase();
      profileImage = path.join(
        "../public",
        "uploads",
        userId,
        formattedFilename
      );

      const uploadPath = path.join(__dirname, "..", profileImage);

      fs.writeFileSync(uploadPath, req.file.buffer);

      // Step 3: Update the user document with the profile image path
      mainData.profileImage = `${userId}/${formattedFilename}`;
    }

    const updatedData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      mainData,
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "User data updated successfull",
      data: updatedData,
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

  // Check if the user already has a profile image and delete it
  if (deletedUser.profileImage) {
    const oldImagePath = path.join(
      __dirname,
      "..",
      "../public",
      "uploads",
      deletedUser.profileImage
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      const deleteFolder = path.join(
        __dirname,
        "..",
        "../public",
        "uploads",
        deletedUser.profileImage.split("/")[0]
      );
      fs.rmdirSync(deleteFolder);
    }
  }

  return res.status(200).json({
    status: 200,
    message: "User deleted successfully",
    data: deletedUser,
  });
};

export const creteNoteController = async (req: Request, res: Response) => {
  const userData = await User.findById({ _id: req.params.userId });
  if (!userData) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  return res.status(200).json({
    status: 200,
    message: "not created",
  });
};
