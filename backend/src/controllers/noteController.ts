// src/controllers/noteController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestWithUser extends Request {
  userId?: number;
}
export const getUserNotes = async (req: RequestWithUser, res: Response): Promise<void> => {
    console.log(" Llegó GET /notes");
  
    if (!req.userId) {
      console.log(" No se encontró userId");
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    console.log(" Buscando notas para userId:", req.userId);
  
    try {
      const notes = await prisma.note.findMany({
        where: { userId: req.userId },
        orderBy: { createdAt: "desc" },
      });
  
      console.log("Notas encontradas:", notes.length);
      res.json({ notes });
    } catch (error) {
      console.error("Error al obtener notas:", error);
      res.status(500).json({ message: "Error fetching notes" });
    }
  };
  export const createNote = async (req: RequestWithUser, res: Response): Promise<void> => {
    const { title, content, category } = req.body;
  
    if (!title || !content || !category) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
  
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    try {
      const newNote = await prisma.note.create({
        data: {
          title,
          content,
          category,
          userId: req.userId,
        },
      });
  
      res.status(201).json({ note: newNote });
    } catch (error) {
      console.error(" Error creating note:", error);
      res.status(500).json({ message: "Failed to create note" });
    }
  };
  