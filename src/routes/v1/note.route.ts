import { Router } from "express";
import multer from "multer";
import {
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getByIdNoteController,
  updateNoteController,
} from "../../controllers/note.controllers";
import { asyncMiddleware } from "../../utils/asyncMiddleware";

const storage = multer.memoryStorage(); // Use memory storage to handle file uploads in memory
const upload = multer({ storage: storage });

const NoteRouter = Router();

NoteRouter.get("/:userId", asyncMiddleware(getAllNotesController));

NoteRouter.get("/get/:noteId", asyncMiddleware(getByIdNoteController));

NoteRouter.post(
  "/",
  upload.single("profileImage"),
  asyncMiddleware(createNoteController)
);

NoteRouter.patch("/update/:noteId", asyncMiddleware(updateNoteController));

NoteRouter.delete("/delete/:noteId", asyncMiddleware(deleteNoteController));

export default NoteRouter;
