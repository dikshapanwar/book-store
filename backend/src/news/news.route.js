import { Router } from "express";
import { createNews, deleteANews, getAllNews, getSingleNews, updateANews } from "./news.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.post('/create-news',createNews);
router.get('/',getAllNews);
router.get('/:id',getSingleNews);
router.put("/edit/:id",verifyToken, updateANews);

router.delete("/delete/:id",verifyToken, deleteANews);

export default router;