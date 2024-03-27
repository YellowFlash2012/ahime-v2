import asyncHandler from "../../middleware/asyncHandler.js";
import Order from "../../models/Order.js";

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Private
export const createNewOrder = asyncHandler(async (req, res) => {
    
    res.status(201).json({
        message: "order placed successfully",
        
    });
});

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/my-orders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "logged in users' orders fetched successfully",
        
    });
});

// @desc    Get a single order/by ID
// @route   GET /api/v1/orders/:id
// @access  Private/Admin
export const getSingleOrder = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        message: "One order fetched successfully",
        
    });
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
    res.status(200).json({
        message: "all orders fetched successfully",
        
    });
});
