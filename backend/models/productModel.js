import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: { type: String, required: true },
        rating: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 5,
        },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        brand: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, default: 0.0, required: true },
        countInStock: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0.0, required: true },
        numReviews: { type: Number, default: 0, required: true },
        reviews: [reviewSchema],
        status: { type: Boolean, default: false, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
