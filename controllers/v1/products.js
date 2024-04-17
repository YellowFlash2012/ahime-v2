import asyncHandler from "../../middleware/asyncHandler.js";
import Product from "../../models/Product.js";

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({
        message: "success",
        count: products.length,
        data: products,
    });
})

// @desc    Get one product
// @route   GET /api/v1/products/:id
// @access  Public
export const getOneProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json({
            message: "success",
            data: product,
        });

    
    } else {
        res.status(404);

        throw new Error("Product NOT found!");
    }
})

// ***admin section
// @desc    Add a new product
// @route   POST /api/v1/products
// @access  Private/Admin
export const addNewProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name:"sample name",
        price:0,
        user:req.user._id,
        image:"/images/sample.jpg",
        brand:"sample brand",
        category:"sample category",
        countInStock: 0,
        numReviews: 0,
        description:"sample description"
    });

    const createdPdt = await product.save();

    res.status(201).json({
        message: "A new product was created!",

        data: createdPdt,
    });
})

// @desc    Edit/Update one product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const editProductByAdmin = asyncHandler(async (req, res) => {

    const { name, price, description, image, brand, category, countInStock } = req.body;
    
    const product = await Product.findById(req.params.id);

    // console.log(req.params.id);
    // console.log(product);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();

        res.status(201).json({
            success:true,
            message: `${product.name} was successfully updated`,
            data: updatedProduct,
        });

    } else {
        res.status(404);

        throw new Error("Product NOT found!");
    }
})