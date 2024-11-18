import { Router } from "express";
import { admin, userLogin, userRegister } from "./user.controller.js";

const router = Router();

router.post("/admin", admin);
router.post("/register", userRegister);
router.post("/login", userLogin);


export default router;