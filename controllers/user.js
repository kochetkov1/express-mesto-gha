import { constants } from "http2";
import { User } from "../models/user.js";

const responseBadRequestError = (res, message) =>
  res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
    message: `Некорректные данные для пользователя.  ${message}`,
  });

const responseServerError = (res, message) =>
  res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send([
    {
      message: `На севрере произошла ошибка.  ${message}`,
    },
  ]);

export const getUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    responseServerError(res, err.message);
  });
};
export const getUser = (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    responseServerError(res, err.message);
  });
};

export const createUser = (req, res) => {
  User.create(req.body)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      responseBadRequestError(res, err.message);
    } else {
      responseServerError(res, err.message);
    }
  });
};