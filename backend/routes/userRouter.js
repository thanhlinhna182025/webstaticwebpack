import express from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    loginUser,
    updateUser,
} from '../controllers/userController.js';
import { verifyUser, verifyAdmin } from '../utils/token.js';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);
userRouter.put('/:id', verifyUser, updateUser);
userRouter.get('/', verifyUser, verifyAdmin, getAllUsers);
userRouter.delete('/:id', verifyUser, verifyAdmin, deleteUser);
userRouter.get('/:id', verifyUser, getUser);
export default userRouter;
