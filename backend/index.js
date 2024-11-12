import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./src/book/book.route.js";

dotenv.config();

// INITIALIZE EXPRESS
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

// ROUTES
app.use("/api/books", bookRoutes);

// DATABASE CONNECTION
connectDB();

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
