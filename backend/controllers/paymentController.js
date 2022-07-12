import config from '../config.js';
import catchAsyncError from '../middleware/catchAsyncError.js';

export const getPaypalClientId = catchAsyncError(async (req, res) => {
    res.status(200).json({ clientId: config.PAYPAL_CLIENT_ID });
});
