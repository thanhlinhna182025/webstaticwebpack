import express from 'express';
import {
    createOrder,
    getOrderById,
    updateOrderStatus,
    getOrderByUser,
} from '../controllers/orderController.js';
import { verifyUser } from '../utils/token.js';
const orderRouter = express.Router();

orderRouter.post('/', verifyUser, createOrder);
orderRouter.get('/mine', verifyUser, getOrderByUser);
orderRouter.get('/:id', verifyUser, getOrderById);
orderRouter.put('/:id/pay', verifyUser, updateOrderStatus);

export default orderRouter;
