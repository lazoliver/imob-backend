import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import vars from "../configs/vars";

interface JwtPayload {
  userId: string;
  organizationId: string;
  role: string;
}

export interface AuthHeader extends Request {
  user?: JwtPayload;
}

export default function validateToken(
  req: AuthHeader,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token não fornecido.",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Header de autorização inválido." });
  }

  try {
    const decoded = jwt.verify(token, vars.jwt_secret_key) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido.",
    });
  }
}
