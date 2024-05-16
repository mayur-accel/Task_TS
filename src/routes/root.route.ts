import { Router } from "express";
import CategoryRoute from "./v1/category.route";
import FileRouter from "./v1/file.route";
import NoteRouter from "./v1/note.route";
import PostRouter from "./v1/post.route";
import UserRouter from "./v1/user.route";

const RootRouter = Router();

RootRouter.use("/user", UserRouter);
RootRouter.use("/post", PostRouter);
RootRouter.use("/category", CategoryRoute);
RootRouter.use("/file", FileRouter);
RootRouter.use("/note", NoteRouter);

export default RootRouter;
