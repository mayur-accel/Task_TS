import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserController,
} from "../../controllers/user.controllers";

const UserRouter = Router();

UserRouter.get("/", getAllUserController);

UserRouter.post("/", createUserController);

UserRouter.get("/:userId", getUserController);

UserRouter.patch("/:userId", updateUserController);

UserRouter.delete("/:userId", deleteUserController);

export default UserRouter;
