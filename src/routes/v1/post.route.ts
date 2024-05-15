import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  getUserActivePostController,
  updatePostController,
} from "../../controllers/post.controllers";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const PostRouter = Router();

PostRouter.get("/", asyncMiddleware(getAllPostController));

PostRouter.get("/:postId", asyncMiddleware(getPostController));

PostRouter.post("/", asyncMiddleware(createPostController));

PostRouter.patch("/:postId", asyncMiddleware(updatePostController));

PostRouter.delete("/:postId", asyncMiddleware(deletePostController));

PostRouter.get("/active/user", asyncMiddleware(getUserActivePostController));

export default PostRouter;
