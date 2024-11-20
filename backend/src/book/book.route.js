import express from "express";
import {
  postABook,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
  getBooksBySearch,
} from "./book.controller.js";

const router = express.Router();

// Define the routes
router.post("/", postABook);                // Create a book
router.get("/", getAllBooks);              // Get all books
router.get("/search", getBooksBySearch);   // Search for books
router.get("/:id", getSingleBook);         // Get a single book by ID
router.put("/:id", updateABook);           // Update a book
router.delete("/:id", deleteABook);        // Delete a book

export default router;
