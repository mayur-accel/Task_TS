import { Router } from "express";
import {
  manyFiledFilesController,
  manyFilesController,
  oneFileController,
} from "../../controllers/file.controllers";
import { uploadFileMiddleware } from "../../middleware/uploadFile.middleware";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const FileRouter = Router();

FileRouter.post(
  "/one",
  uploadFileMiddleware.single("avatar"),
  asyncMiddleware(oneFileController)
);

FileRouter.post(
  "/many",
  uploadFileMiddleware.array("photos", 12),
  asyncMiddleware(manyFilesController)
);

FileRouter.post(
  "/manyfields/:id",
  uploadFileMiddleware.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "photo",
      maxCount: 1,
    },
  ]),
  asyncMiddleware(manyFiledFilesController)
);

export default FileRouter;
