import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { ChatMessagesController } from '../controllers/ChatMessagesController';
import { isAdmin, isAuthorized } from '../middlewares/Auth';

export const chatMessagesRouter: Router = express.Router();

const chatMessageController = new ChatMessagesController();

chatMessagesRouter.get('/:id?', chatMessageController.get);
chatMessagesRouter.post('', isAuthorized, chatMessageController.create);
chatMessagesRouter.put('/:id', isAuthorized, chatMessageController.update);
chatMessagesRouter.delete('/:id', isAuthorized, chatMessageController.delete);