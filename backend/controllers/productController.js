import catchAsyncError from '../middleware/catchAsyncError.js';
import Product from '../models/productModel.js';
import createError from '../utils/error.js';

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { name, brand, category, description } = req.body;
    if (!name || !brand || !category || !description) {
        return next(createError(403, 'Please enter full data '));
    }
    const product = new Product(req.body);
    const createProduct = await product.save();
    if (!createProduct) {
        return next(createError(500, 'Error creating product'));
    }
    res.status(201).json({ message: 'Product created', createProduct });
});

export const getAllProduct = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    if (!products) {
        return next(createError(404, 'Not found'));
    }
    res.status(200).json(products);
});

export const getProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(createError(404, 'Not found'));
    }
    res.status(200).json(product);
});
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(createError(404, 'Not found product'));
    }
    res.status(200).json({ message: 'Product deleted' });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(createError(404, 'Not Found Product'));
    }
    const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    );
    res.status(200).json({ message: 'Product updated' });
});
export const createReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(createError(404, 'Not found '));
    }
    const review = {
        name: req.user.name,
        user: req.user._id,
        rating: req.body.rating,
        comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).json({
        message: 'Review created',
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
});
export const updateStatus = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(createError(404, 'Not found'));
    }
    product.status = !product.status;
    await product.save();
    res.status(200).json({ message: 'Status updated' });
});
