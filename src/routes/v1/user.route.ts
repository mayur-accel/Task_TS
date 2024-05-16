import { Router } from "express";
import multer from "multer";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserController,
} from "../../controllers/user.controllers";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const storage = multer.memoryStorage(); // Use memory storage to handle file uploads in memory
const upload = multer({ storage: storage });

const UserRouter = Router();

UserRouter.get("/", asyncMiddleware(getAllUserController));

UserRouter.post(
  "/",
  upload.single("profileImage"),
  asyncMiddleware(createUserController)
);

UserRouter.get("/:userId", asyncMiddleware(getUserController));

UserRouter.patch(
  "/:userId",
  upload.single("profileImage"),
  asyncMiddleware(updateUserController)
);

UserRouter.delete("/:userId", asyncMiddleware(deleteUserController));

export default UserRouter;
