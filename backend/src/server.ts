import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("API QuickNotes funcionando ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


const prisma = new PrismaClient();

async function testDB() {
  try {
    await prisma.user.findMany();
    console.log(" Base de datos conectada correctamente");
  } catch (error) {
    console.error(" Error conectando con la base de datos:", error);
  }
}

testDB();