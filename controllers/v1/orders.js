import asyncHandler from "../../middleware/asyncHandler.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import { calcPrices } from "../../utils/calcPrices.js";
import { checkIfNewTransaction, verifyPayPalPayment } from "../../utils/paypal.js";

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Private
export const createNewOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)

        throw new Error("No order items")
    } else {
        const itemsFromDB = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) },
        });

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
            );
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        // calculate prices
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
            calcPrices(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json({
            message: "Your order was placed successfully!",
            data: createdOrder,
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
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error("Payment not verified");

    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error("Transaction has been used before");

    const order = await Order.findById(req.params.id);

    if (order) {
        // check the correct amount was paid
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error("Incorrect amount paid");
        
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.status(201).json({
            message: `The order ${order._id} is now paid`,
            data: updatedOrder,
        });
    } else {
        res.status(404);
        throw new Error("Error is NOT found!");
    }
});

// @desc    Update order to delivered by admin
// @route   PUT /api/v1/orders/:id/delivered
// @access  Private/Admin
export const updateOrderToDeliveredByAdmin = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);
    // console.log(req.params.id);

    if (order) {
        order.isDelivered = true;

        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        
        res.status(201).json({
            message: `Order ${order._id} has been delivered`,
            data:updatedOrder
        });
    } else {
        res.status(404)
        throw new Error("The specified order was NOT found!")
    }
});

// @desc    Get all orders by admin
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getAllOrdersByAdmin = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");

    res.status(200).json({
        message: "Here are all the orders placed on this site ...",
        count: orders.length,
        data:orders
    });
});
