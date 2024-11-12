import express from "express";
import {
    deleteABook,
  getAllBooks,
  getSingleBook,
  postABook,
  updateABook,
} from "./book.controller.js";
const router = express.Router();

// POST A BOOK
router.post("/create-book", postABook);
//GET ALL BOOKS
router.get("/", getAllBooks);
//GET A BOOK
router.get("/:id", getSingleBook);
//UPDATE A BOOK
router.put("/:id", updateABook);
//DELETE A BOOK
router.delete("/:id", deleteABook);
export default router;
