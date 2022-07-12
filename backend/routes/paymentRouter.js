import express from 'express';
import { getPaypalClientId } from '../controllers/paymentController.js';
const paymentRouter = express.Router();
paymentRouter.get('/clientId', getPaypalClientId);

export default paymentRouter;
