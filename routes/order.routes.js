import express from "express";
import { createOrder, getAllOrders, getOrderByID, updateOrder } from "../controllers/order.controller.js";


const router = express.Router();

router.route("/").get(getAllOrders);
router.route("/").post(createOrder);
router.route("/:id").get(getOrderByID);
router.route("/:id").put(updateOrder);

export default router;