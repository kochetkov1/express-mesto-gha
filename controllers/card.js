import { constants } from "http2";
import { Card } from "../models/card.js";

export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "Ошибка загрузки карточек с сервера" });
    });
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Введенные данные некорректны" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "На севрере произошла ошибка" });
      }
    });
};

export const deleteCard = (req, res) => {
  console.log(req.params);
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Такой карточки не существует" });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Введенные данные некорректны" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({ message: "Ошибка удаления карточки с сервера" });
      }
    });
};

export const addLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Такой карточки не существует" });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Введенные данные некорректны" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({
            message:
              "Произошла ошибка на сервере при постановки лайка на карточку",
          });
      }
    });
};

export const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res
          .status(constants.HTTP_STATUS_NOT_FOUND)
          .send({ message: "Такой карточки не существует" });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        res
          .status(constants.HTTP_STATUS_BAD_REQUEST)
          .send({ message: "Введенные данные некорректны" });
      } else {
        res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .send({
            message:
              "Произошла ошибка на сервере при удалении лайка на карточке",
          });
      }
    });
};
