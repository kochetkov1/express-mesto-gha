import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} from "../controllers/card.js";

export const cardRouter = Router();

cardRouter.get("/cards", getCards);
cardRouter.post("/cards", createCard);
cardRouter.delete("/cards/:cardId", deleteCard);
cardRouter.put("/cards/:cardId/likes", addLikeCard);
cardRouter.delete("/cards/:cardId/likes", deleteLikeCard);
