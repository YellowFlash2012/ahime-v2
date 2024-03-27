import asyncHandler from "../../middleware/asyncHandler.js";
import Order from "../../models/Order.js";

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Private
export const createNewOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)

        throw new Error("No order items")
    } else {
        const order = new Order({
            orderItems: orderItems.map(x => ({ ...x, product: x._id, _id: undefined })), user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json({
            message: "Your order was placed successfully!",
            data:createdOrder
            
        });
    }
});

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/my-orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        message: "Here are your orders!",
        count:orders.length,
        data:orders
    });
});

// @desc    Get a single order/by ID
// @route   GET /api/v1/orders/:id
// @access  Private/Admin
export const getSingleOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.status(200).json({
            message: "Here is the requested order...",
            data:order
        });
    } else {
        res.status(400)

        throw new Error("Requested order was NOT found!")
    }
    
});

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/paid
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "One order updated to paid",
        
    });
});

// @desc    Update order to delivered by admin
// @route   PUT /api/v1/orders/:id/delivered
// @access  Private/Admin
export const updateOrderToDeliveredByAdmin = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "One order updated to delivered",
    });
});

// @desc    Get all orders by admin
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getAllOrdersByAdmin = asyncHandler(async (req, res) => {
    const orders = await Order.find({});

    res.status(200).json({
        message: "Here are all the orders placed on this site ...",
        count: orders.length,
        data:orders
    });
});
