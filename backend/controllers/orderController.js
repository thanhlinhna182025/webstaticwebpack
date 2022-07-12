import catchAsyncError from '../middleware/catchAsyncError.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import createError from '../utils/error.js';

export const createOrder = catchAsyncError(async (req, res) => {
    const {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = req.body;
    const order = new Order({
        user: req.user._id,
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    });
    const newOrder = await order.save();
    res.status(201).json({ message: 'New Order Created', order: newOrder });
});

export const getOrderById = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(createError(404, 'Not found Order'));
    }
    res.status(200).json(order);
});

export const updateOrderStatus = catchAsyncError(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentResult = {
            orderID: req.body.orderID,
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
        };
        const updateOder = await order.save();
        res.status(200).json({ message: 'Order Paid', order: updateOder });
    } else {
        return next(createError(404, 'Not found Order'));
    }
});

export const getOrderByUser = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
        return next(createError(404, 'Not found'));
    }
    res.status(200).json(order);
});

