import express from "express";
import { addNewProduct, getAllProducts, getOneProduct } from "../../controllers/v1/products.js";
import { admin, protect } from "../../middleware/auth.js";


const router = express.Router();

router.route("/").get(getAllProducts).post(protect,admin, addNewProduct)
router.route("/:id").get(getOneProduct);



export default router