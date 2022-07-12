import catchAsyncError from '../middleware/catchAsyncError.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

export const getStatistical = catchAsyncError(async (req, res, next) => {
    const orders = await Order.aggregate([
        {
            $group: {
                _id: null,
                numOrders: { $sum: 1 },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const users = await User.aggregate([
        {
            $group: {
                _id: null,
                numUsers: { $sum: 1 },
            },
        },
    ]);
    const monthyUsers = await User.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m', date: '$createdAt' },
                },
                numUsers: { $sum: 1 },
            },
        },
    ]).sort({ _id: 1 });
    const monthyOrders = await Order.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m', date: '$createdAt' },
                },
                orders: { $sum: 1 },
                sales: { $sum: '$totalPrice' },
            },
        },
    ]).sort({ _id: 1 });
    res.status(200).json({
        orders: orders.length === 0 ? [{ orders: 0 }, { sales: 0 }] : orders,
        users,
        monthyOrders:
            monthyOrders.length === 0
                ? [{ orders: 0 }, { sales: 0 }]
                : monthyOrders,
        monthyUsers: monthyUsers.length === 0 ? [{ numUsers: 0 }] : monthyUsers,
    });
});
