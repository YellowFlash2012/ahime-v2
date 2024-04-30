import asyncHandler from "../../middleware/asyncHandler.js";
import Product from "../../models/Product.js";

// @desc    Fetch all products
// @route   GET /api/v1/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();

    const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
    
    res.status(200).json({
        message: "success",
        count: products.length,
        data: {products, page, pages:Math.ceil(count/pageSize)},
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

// @desc    Add a review
// @route   POST /api/v1/products/:id/reviews
// @access  Private
export const addAReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400)

            throw new Error("You have already reviewed this product!")
        } 

        const review = { name: req.user.name, rating, comment, user: req.user._id };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();


        res.status(201).json({
            success:true,
            message: "Your review was successfully added!",
        
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

// @desc    Delete one product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProductByAdmin = asyncHandler(async (req, res) => {
    
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });

        res.status(200).json({
            success:true,
            message: `${product.name} was successfully deleted`,
        });

    } else {
        res.status(404);

        throw new Error("Product NOT found!");
    }
})