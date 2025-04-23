import express from "express";
import { createNote, getUserNotes } from "../controllers/noteController";
import { authMiddleware } from "../middleware/authMiddleware";




const router = express.Router();

router.get("/", authMiddleware, getUserNotes);
router.post("/", authMiddleware, createNote);


export default router;
