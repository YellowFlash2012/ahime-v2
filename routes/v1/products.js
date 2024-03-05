import express from "express";
import asyncHandler from "../../middleware/asyncHandler.js";
import Product from "../../models/Product.js";

const router = express.Router();

router.get("/", asyncHandler( async(req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        message:"success",
        count:products.length,
        data:products
    });
}))

router.get("/:id", asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json({
            message: "success",
            data: product,
        });

        return;
        
    } else {
        res.status(404);

        throw new Error("Product NOT found!")
    }
        
    
}))


export default router