import express from "express";
import { getAllProducts, getOneProduct } from "../../controllers/v1/products.js";


const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/:id").get(getOneProduct);



export default router