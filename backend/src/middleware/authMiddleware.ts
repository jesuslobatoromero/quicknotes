import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestWithUser extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log("Header recibido:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(" Token ausente o mal formado");
    res.status(401).json({ message: "Authorization header missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log(" Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    req.userId = decoded.userId;
    console.log(" Token válido, userId extraído:", req.userId);
    next();
  } catch (err) {
    console.log(" Token inválido o expirado");
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
