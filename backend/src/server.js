import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chatroutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 🔥 DB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch(err => console.log("❌ DB error:", err));

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔥 ROUTES
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

// 🔥 SERVER
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});