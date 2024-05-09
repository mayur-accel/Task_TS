import { Router } from "express";
import CategoryRoute from "./v1/category.route";
import PostRouter from "./v1/post.route";
import UserRouter from "./v1/user.route";

const RootRouter = Router();

RootRouter.use("/user", UserRouter);
RootRouter.use("/post", PostRouter);
RootRouter.use("/category", CategoryRoute);

export default RootRouter;
