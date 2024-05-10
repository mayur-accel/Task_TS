import dotenv from "dotenv";
import express from "express";
import { DatabaseConnetion } from "./DB/DBConnection";
import { errorHandler } from "./middleware/errorHandler";
import RootRouter from "./routes/root.route";

dotenv.config();
const app = express();

DatabaseConnetion();

app.use(express.json());

app.use("/api/v1", RootRouter);

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    "Server running on " + process.env.SERVER_HOSTURL + process.env.SERVER_PORT
  );
});
