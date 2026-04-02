import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import {
  getUserbyEmail,
  getUserbyUsername,
} from "../../services/auth/services";

export async function validateCredentials(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { cred, password } = req.body;

  if (!cred || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cred);

  const user = isEmail
    ? await getUserbyEmail(cred)
    : await getUserbyUsername(cred);

  if (!user || !user.password) {
    return res
      .status(401)
      .json({ error: "Invalid credentials , try signing up?" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  (req as any).user = user;

  next();
}
