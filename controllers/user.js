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
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
        // responseNotFound(res, err.message);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные поиска' });
        responseBadRequestError(res, err.message);
      } else {
        // res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
        responseServerError(res, err.message);
      }
    });
};

// export const getUser = (req, res) => {
//   // User.findById(req.params.userId)
//     User.find({ _id: req.params.userId })
//     .then((user) => {
//      // console.log(user);
//       if (user) {
//         console.log(user);
//         res.send(user);
//       } else {
//         responseNotFound(res, err.message);
//       }
//     })
//     .catch((err) => {
//       if (err.name === "CastError") {
//         responseBadRequestError(res, err.message);
//       } else {
//         responseServerError(res, err.message);
//       }
//     });
// };

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
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
  .then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      // responseNotFound(res, err.message);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные поиска' });
      // responseBadRequestError(res, err.message);
    } else {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      // responseServerError(res, err.message);
    }
  });
};

export const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  .then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь не найден' });
      // responseNotFound(res, err.message);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные поиска' });
      // responseBadRequestError(res, err.message);
    } else {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка сервера' });
      // responseServerError(res, err.message);
    }
  });
};
