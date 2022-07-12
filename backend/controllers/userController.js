import catchAsyncError from '../middleware/catchAsyncError.js';
import createError from '../utils/error.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils/token.js';
export const createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    // required
    if (!name || !email || !password) {
        return next(createError(401, 'Please enter name , email, password'));
    }
    // unique email
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
        return next(createError(404, 'Email already exists'));
    }

    //all good
    const hashpassword = hashPassword(password);
    const newUser = new User({ name, email, password: hashpassword });
    const createUser = await newUser.save();
    const token = generateToken(createUser);
    res.status(201).json({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        token: token,
    });
});
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createError(401, 'Please enter email and password'));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(createError(404, 'Wrong email or password'));
    }
    //compare password
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) {
        return next(createError(404, 'Wrong email or password'));
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
    });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let userUpdate;
    if (password) {
        const hashpassword = hashPassword(password);
        userUpdate = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                password: hashpassword,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            _id: userUpdate._id,
            name: userUpdate.name,
            email: userUpdate.email,
            isAdmin: userUpdate.isAdmin,
            token: generateToken(userUpdate),
        });
    } else {
        userUpdate = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
            },
            { new: true, runValidators: true }
        );
        res.status(200).json({
            _id: userUpdate._id,
            name: userUpdate.name,
            email: userUpdate.email,
            isAdmin: userUpdate.isAdmin,
            token: generateToken(userUpdate),
        });
    }
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});
    if (!users) {
        return next(createError(404, 'Not found'));
    }
    res.status(200).json(users);
});
export const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(createError(404, 'Not found user'));
    }
    res.status(200).json(user);
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(createError(404, 'Not found User'));
    }
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
        return next(createError(500, 'Server error'));
    } else {
        res.status(200).json({ message: 'Success' });
    }
});
