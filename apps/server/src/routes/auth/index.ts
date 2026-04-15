import { Router } from "express";
import signInRoutes from "./signin/index";
import signUpRoutes from "./signup/index";

import type { Router as ExpressRouter } from "express";
import { requireAuth } from "../../middlewares/auth/jwt";
import { prisma } from "../../lib/prisma";

import jwt from "jsonwebtoken";
const router: ExpressRouter = Router();

router.use("/signin", signInRoutes);
router.use("/signup", signUpRoutes);

router.get("/me", requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const token = req.cookies.token;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true,
      avatarUrl: true,
      coverImageUrl: true,
      createdAt: true,

      rooms: {
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          type: true,
          createdAt: true,
        },
      },

      gigs: {
        select: {
          id: true,
          title: true,
          description: true,
          imageUrls: true,
          type: true,
          reward: true,
          date: true,
          createdAt: true,
          roomId: true,
        },
      },
    },
  });

  if (!user) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.status(401).json({ error: "User not found" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
    ignoreExpiration: true,
  }) as any;

  const iat = decoded.iat * 1000;
  const now = Date.now();

  const ONE_DAY = 24 * 60 * 60 * 1000;

  if (now - iat > ONE_DAY) {
    const newToken = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  return res.json(user);
});
export default router;
