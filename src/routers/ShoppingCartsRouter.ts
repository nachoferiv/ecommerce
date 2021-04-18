import express, { Request, Response, NextFunction, RouterOptions, Router} from 'express';
import { ShoppingCartsController } from '../controllers/ShoppingCartController';
import { isAdmin, isAuthorized } from '../middlewares/Auth';

export const shoppingCartRouter: Router = express.Router();
const shoppingCartController = new ShoppingCartsController();

shoppingCartRouter.get('/:id?', shoppingCartController.get);
shoppingCartRouter.post('', isAuthorized, shoppingCartController.create);
shoppingCartRouter.delete('/:id', isAuthorized, shoppingCartController.delete);