// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

import { Router } from 'express';
// import User from '../models/user.js';
import { getUsers, getUser, createUser } from '../controllers/user.js';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);