import express from "express";
import {
    deleteABook,
  getAllBooks,
  getBooksBySearch,
  getSingleBook,
  postABook,
  updateABook,
} from "./book.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

// POST A BOOK
router.post("/create-book",verifyToken, postABook);
//GET ALL BOOKS
router.get("/", getAllBooks);
//GET A BOOK
router.get("/:id", getSingleBook);
//UPDATE A BOOK
router.put("/edit/:id",verifyToken, updateABook);
//DELETE A BOOK
router.delete("/delete/:id",verifyToken, deleteABook);
//SEARCH BOOKS
router.get("/search", getBooksBySearch);
export default router;
