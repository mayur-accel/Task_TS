import { Router } from "express";

const CategoryRoute = Router();

CategoryRoute.get("/", (req, res) => {
  res.status(200).json({ message: "I am get request to Category Router" });
});

CategoryRoute.post("/", (req, res) => {
  res.status(200).json({ message: "I am post request to Category Router" });
});

CategoryRoute.put("/", (req, res) => {
  res.status(200).json({ message: "I am put request to Category Router" });
});

CategoryRoute.delete("/", (req, res) => {
  res.status(200).json({ message: "I am delete request to Category Router" });
});

export default CategoryRoute;
