import { Router } from "express";

import type { Router as ExpressRouter } from "express";
import { getUserbyUsername } from "../../services/auth/services";
const router: ExpressRouter = Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const user = await getUserbyUsername(username);
  if (!user) return res.status(401).json({ error: "User not found" });
  return res.json(user);
});

export default router;
