import express from "express";
import { createNewOrder, getAllOrdersByAdmin, getMyOrders, getSingleOrder,  updateOrderToDeliveredByAdmin, updateOrderToPaid } from "../../controllers/v1/orders.js";

import { admin, protect } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, createNewOrder).get(protect, admin, getAllOrdersByAdmin);

router.route("/my-orders").get(protect, getMyOrders)

router.route("/:id").get(protect, admin, getSingleOrder);

router.route("/:id/paid").put(protect, updateOrderToPaid);

router.route("/:id/delivered").put(protect, admin, updateOrderToDeliveredByAdmin);


export default router;
