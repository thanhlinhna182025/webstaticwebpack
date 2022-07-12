import express from 'express';
import { getStatistical } from '../controllers/statisticalController.js';
import { verifyAdmin, verifyUser } from '../utils/token.js';

const statisticalRouter = express.Router();
statisticalRouter.get('/', verifyUser, verifyAdmin, getStatistical);
export default statisticalRouter;
