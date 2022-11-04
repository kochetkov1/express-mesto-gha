// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, updateAvatar } from '../controllers/user.js';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);