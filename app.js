import express from "express";
import mongoose from "mongoose";
import { constants } from "http2";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { cardRouter } from "./routes/cardRouter.js";

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63652cbed4f346d9c2d88b8d",
  };

  next();
});

app.use("/", userRouter);
app.use("/", cardRouter);

app.all("/*", (req, res) => {
  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send({ message: "Такой страницы не существует" });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});