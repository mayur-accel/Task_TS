import { Router } from "express";

const PostRouter = Router();

PostRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "I am get request on Post router",
  });
});

PostRouter.post("/", (req, res) => {
  res.status(200).json({
    message: "I am post request on Post router",
  });
});

PostRouter.put("/", (req, res) => {
  res.status(200).json({
    message: "I am put request on Post router",
  });
});

PostRouter.delete("/", (req, res) => {
  res.status(200).json({
    message: "I am delete request on Post router",
  });
});

export default PostRouter;
