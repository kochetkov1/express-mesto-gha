import express from 'express';
import mongoose from 'mongoose';
// import path from 'path';
import bodyParser from 'body-parser';
import { userRouter } from './routes/userRouter.js';

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

app.use('/users', userRouter);

