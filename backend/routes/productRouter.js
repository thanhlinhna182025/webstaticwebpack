import express from 'express';
import {
    createProduct,
    createReview,
    deleteProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    updateStatus,
} from '../controllers/productController.js';
import { verifyAdmin, verifyUser } from '../utils/token.js';
// import { verifyUser, verifyAdmin } from '../utils/token.js';
// import upload from '../routes/upload.js';

const productRouter = express.Router();

productRouter.post('/', verifyUser, verifyAdmin, createProduct);
productRouter.get('/', getAllProduct);
productRouter.put('/:id', verifyUser, verifyAdmin, updateProduct);
productRouter.put('/:id/status', verifyUser, verifyAdmin, updateStatus);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', verifyUser, verifyAdmin, deleteProduct);
productRouter.post('/:id/reviews', verifyUser, createReview);

export default productRouter;
