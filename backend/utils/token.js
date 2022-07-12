import config from '../config.js';
import jwt from 'jsonwebtoken';
import createError from './error.js';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRET_KEY,
        {
            expiresIn: config.JWT_EXPIRES,
        }
    );
};

export const verifyUser = (req, res, next) => {
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
        return next(createError(401, 'You are not authenticated !'));
    }
    const token = tokenBearer.split(' ')[1];
    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return next(createError(403, 'Token not valid !'));
        }
        req.user = user;
        next();
    });
};

export const verifyAdmin = (req, res, next) => {
    
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, 'You are not Admin'));
    }
};
