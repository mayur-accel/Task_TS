import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDatabase } from "./DB/DBConnection";
import { errorHandler } from "./middleware/errorHandler";
import RootRouter from "./routes/root.route";

dotenv.config();

const app = express();

connectDatabase();
app.use(morgan("dev"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", RootRouter);

// Error Handling Middleware
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    "Server running on " + process.env.SERVER_HOSTURL + process.env.SERVER_PORT
  );
});
