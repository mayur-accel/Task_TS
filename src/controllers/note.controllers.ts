import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Note from "../model/note.model";
import User from "../model/user.model";

// Ensure the uploads directory exists
const ensureUploadsDirExists = (userId: string) => {
  const dir = path.join(__dirname, "..", "../public", "note", userId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const getAllNotesController = async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.params.userId });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  const data = await Note.find({ userId: req.params.userId });

  if (data.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "Note data not found",
    });
  }

  const newData = data.map((item) => {
    let note = "";
    if (fs.existsSync(`public/${item.fileUrl}`)) {
      note = fs.readFileSync(`public/${item.fileUrl}`, "utf-8");
    }

    return {
      _id: item._id,
      note: note,
    };
  });

  return res.status(200).json({
    status: 200,
    message: "Note get successfull",
    data: newData,
  });
};

export const getByIdNoteController = async (req: Request, res: Response) => {
  const noteData = await Note.findById({ _id: req.params.noteId });

  if (!noteData) {
    return res.status(404).json({
      status: 404,
      message: "Note not found",
    });
  }
  let note = "";
  if (fs.existsSync(`public/${noteData.fileUrl}`)) {
    note = await fs.readFileSync(`public/${noteData.fileUrl}`, "utf-8");
  }

  const newData = {
    _id: noteData._id,
    userId: noteData.userId,
    note,
  };

  return res.status(200).json({
    status: 200,
    message: "Note get sucessfull",
    data: newData,
  });
};

export const createNoteController = async (req: Request, res: Response) => {
  ensureUploadsDirExists(String(req.body.userId));

  const filePath = `note/${req.body.userId}/note_${Date.now()}.txt`;

  await fs.writeFileSync(`public/${filePath}`, String(req.body?.note));
  const { blksize } = await fs.statSync(`public/${filePath}`);
  const fileData = {
    fileName: `${filePath}.txt`,
    mimetype: "text/plain",
    fileUrl: filePath,
    fileSize: blksize,
    userId: req.body.userId,
  };

  const saveData = new Note(fileData);

  await saveData.save();

  res.status(201).json({
    status: 201,
    message: "Create Note created successfull",
  });
};

export const updateNoteController = async (req: Request, res: Response) => {
  const noteData = await Note.findById({ _id: req.params.noteId });

  if (!noteData) {
    return res.status(404).json({
      status: 404,
      message: "Note data not found",
    });
  }

  if (!req.body.note) {
    return res.status(404).json({
      status: 404,
      message: "note field not be empty, please enter value",
    });
  }

  fs.writeFileSync(`public/${noteData.fileUrl}`, req.body.note);

  // if (fs.existsSync(`public/${noteData.fileUrl}`)) {
  //   fs.appendFileSync(`public/${noteData.fileUrl}`, req.body.note);
  // } else {
  //   fs.writeFileSync(`public/${noteData.fileUrl}`, req.body.note);
  // }

  res.json({
    status: 200,
    message: "update Note coneroler",
    data: {
      note: req.body.note,
    },
  });
};

export const deleteNoteController = async (req: Request, res: Response) => {
  const noteData = await Note.findById({ _id: req.params.noteId });

  if (!noteData) {
    return res.status(404).json({
      status: 404,
      message: "Note data not found",
    });
  }

  await Note.findOneAndDelete({ _id: req.params.noteId });

  if (fs.existsSync(`public/${noteData.fileUrl}`)) {
    fs.unlinkSync(`public/${noteData.fileUrl}`);
  }

  res.status(200).json({
    status: 200,
    message: "Note deleted successfull",
  });
};
