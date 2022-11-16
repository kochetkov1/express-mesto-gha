import { Router } from 'express';
import {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} from '../controllers/user.js';
import {
  userIdValidator,
  userAvatarValidator,
  userDescriptionValidator,
} from '../utils/validators.js';

export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', userIdValidator, getUser);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', userDescriptionValidator, updateUser);
userRouter.patch('/me/avatar', userAvatarValidator, updateAvatar);
