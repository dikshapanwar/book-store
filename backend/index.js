import express from "express";
import mongoose from "mongoose";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./src/book/book.route.js";
import  orderRoutes from "./src/order/order.route.js";
import userRoutes from "./src/users/user.route.js";
import newsRoutes from "./src/news/news.route.js";
import AdminRoute from './src/stats/admin.stats.js';
dotenv.config();

// INITIALIZE EXPRESS
const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ROUTES
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", AdminRoute);
app.use("/api/news", newsRoutes);
// DATABASE CONNECTION
connectDB();

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
