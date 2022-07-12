import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Please enter username'] },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            validate: [validator.isEmail, 'Please enter a valid email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
