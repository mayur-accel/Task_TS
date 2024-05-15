import { Request, Response } from "express";

export const oneFileController = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "One file upload",
    fileData: req.file,
  });
};

export const manyFilesController = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "many file upload",
    fileData: req.files,
  });
};

export const manyFiledFilesController = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "many filed file upload",
    fileDataes: req.files,
    // @ts-ignore
    avater: "http://localhost:3000/" + req.files.avatar[0].filename,
    // @ts-ignore
    photo: "http://localhost:3000/" + req.files.photo[0].filename,
  });
};
