import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import { userRouter } from './routes/userRouter.js';
import { cardRouter } from './routes/cardRouter.js';
import { createUser, login } from './controllers/user.js';
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './utils/validators.js';
import { errorMessages } from './utils/errorMessages.js';
import { NotFoundError } from './errors/NotFoundError.js';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Вызов роутов авторизации и регистрации (доступны до авторизации)
app.post('/signin', userLoginValidator, login);
app.post('/signup', userBodyValidator, createUser);

// Все, что ниже - доступно только для авторизованных пользователей
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.all('/*', (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  console.log('app error');
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
