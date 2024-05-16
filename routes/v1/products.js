import express from "express";
import { addAReview, addNewProduct, deleteProductByAdmin, editProductByAdmin, getAllProducts, getOneProduct, getTopRatedProducts } from "../../controllers/v1/products.js";
import { admin, protect } from "../../middleware/auth.js";
import checkObjectId from "../../middleware/checkObjectId.js";


const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, addNewProduct)

router.route("/top").get(getTopRatedProducts)

router
    .route("/:id")
    .get(checkObjectId, getOneProduct)
    .put(protect, admin, checkObjectId, editProductByAdmin)
    .delete(protect, admin, checkObjectId, deleteProductByAdmin);

// reviews
router.route("/:id/reviews").post(protect, checkObjectId, addAReview)

export default router