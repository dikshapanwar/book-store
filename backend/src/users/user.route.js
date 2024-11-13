import { Router } from "express";
import { admin } from "./user.controller.js";

const router = Router();

router.post("/admin", admin);


export default router;