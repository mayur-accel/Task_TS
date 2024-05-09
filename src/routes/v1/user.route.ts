import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "I am get request on User router",
  });
});

UserRouter.post("/", (req, res) => {
  res.status(200).json({
    message: "I am post request on User router",
  });
});

UserRouter.put("/", (req, res) => {
  res.status(200).json({
    message: "I am put request on User router",
  });
});

UserRouter.delete("/", (req, res) => {
  res.status(200).json({
    message: "I am delete request on User router",
  });
});

export default UserRouter;
