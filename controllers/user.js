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

const responseNotFound = (res, message) =>
  res.status(constants.HTTP_STATUS_NOT_FOUND).send([
    {
      message: `Не удалось найти пользователя.  ${message}`,
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
      if (err.name === "ValidationError") {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        responseNotFound(res, err.message);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        responseNotFound(res, err.message);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};
