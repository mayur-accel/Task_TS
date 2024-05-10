import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  updatePostController,
} from "../../controllers/post.controllers";

const PostRouter = Router();

PostRouter.get("/", getAllPostController);

PostRouter.get("/:postId", getPostController);

PostRouter.post("/", createPostController);

PostRouter.patch("/:postId", updatePostController);

PostRouter.delete("/:postId", deletePostController);

export default PostRouter;
