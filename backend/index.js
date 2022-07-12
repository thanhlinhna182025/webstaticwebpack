import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import statisticalRouter from './routes/statisticalRouter.js';
import productRouter from './routes/productRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import upload from './middleware/upload.js';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('DB connected');
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
//Public
app.use('/upload', express.static(path.join(__dirname, '/upload')));

app.post('/api/upload', upload, (req, res, next) => {
    res.status(200).json({ path: req.file.path });
});

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/paypal', paymentRouter);
app.use('/api/statistical', statisticalRouter);
app.use('/api/products', productRouter);

app.use((req, res, next) => {
    next(createHttpError(404));
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
app.listen(process.env.PORT || 4000, () => {
    connectDB();
    console.log('server run on Port 4000');
});
