import { constants } from "http2";
import { Card } from "../models/card.js";

const responseBadRequestError = (res, message) =>
  res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
    message: `Некорректные данные для карточки.  ${message}`,
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
      message: `Не удалось найти карточку.  ${message}`,
    },
  ]);

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      responseServerError(res, err.message);
    });
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        responseBadRequestError(res, err.message);
      } else {
        responseServerError(res, err.message);
      }
    });
};

export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send(card);
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

export const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
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

export const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
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
