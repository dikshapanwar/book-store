import { Router } from "express";
import { createOrder, getOrderByEmail } from "./order.controller.js";

const router = Router();
router.post("/", createOrder);
router.get("/email/:email",getOrderByEmail)


export default router;