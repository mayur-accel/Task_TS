import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserController,
} from "../../controllers/user.controllers";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const UserRouter = Router();

UserRouter.get("/", asyncMiddleware(getAllUserController));

UserRouter.post("/", asyncMiddleware(createUserController));

UserRouter.get("/:userId", asyncMiddleware(getUserController));

UserRouter.patch("/:userId", asyncMiddleware(updateUserController));

UserRouter.delete("/:userId", asyncMiddleware(deleteUserController));

export default UserRouter;
