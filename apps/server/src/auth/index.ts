import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import jwt from "jsonwebtoken";
const router: ExpressRouter = Router();
import "dotenv/config";

router.post("/oauth", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res.status(401).json({ error: "unauthorized/invalid token" });
    }
    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
    };
    console.log(user);
    //TODO: asve user in DB
    const appToken = jwt.sign(
      { id: user.googleId, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    return res.json({
      message: "Auth success",
      user,
      token: appToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Token verification failed" });
  }
});

export default router;
