// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

import { Router } from 'express';
import { getCards, createCard, deleteCard, addLikeCard, deleteLikeCard } from '../controllers/card.js';

export const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', addLikeCard);
cardRouter.delete('/cards/:cardId/likes', deleteLikeCard);