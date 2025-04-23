import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });


export const register = async (req: Request, res: Response) => {
    console.log("Se llamó a /register", req.body);
  
    try {
      console.log("Buscando usuario existente...");
      const existingUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      console.log("Resultado búsqueda:", existingUser);
  
      if (existingUser) {
        console.log("El usuario ya existe");
        return res.status(400).json({ message: "El usuario ya existe" });
      }
  
      console.log("Encriptando contraseña...");
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      console.log("Creando usuario en DB...");
      await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        },
      });
  
      console.log("Usuario creado!");
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      console.error("Error en register:", error);
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  };

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
