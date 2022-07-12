import dotenv from 'dotenv';
dotenv.config();
const config = {
    MONGO_URL: process.env.MONGO_URL,
    SALT: process.env.SALT * 1,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
};
export default config;
