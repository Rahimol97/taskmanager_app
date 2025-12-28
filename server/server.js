import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
})); 


app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/task",taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
