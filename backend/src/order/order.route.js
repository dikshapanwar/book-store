import { Router } from "express";
import { createOrder, getAllOrders, getOrder, getOrderByEmail } from "./order.controller.js";

const router = Router();
router.post("/", createOrder);
router.get("/email/:email",getOrderByEmail);
router.get('/all', getAllOrders);
router.get("/:id", getOrder);


export default router;