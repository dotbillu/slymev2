import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth/index";
import { requireAuth } from "./middlewares/auth/jwt";

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
