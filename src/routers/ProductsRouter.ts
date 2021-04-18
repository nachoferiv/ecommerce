import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { ProductsController } from '../controllers/ProductController';
import { isAdmin, isAuthorized } from '../middlewares/Auth';

export const productsRouter: Router = express.Router();

const productsController = new ProductsController();

productsRouter.get('/:id?', productsController.get);
productsRouter.post('', isAuthorized, productsController.create);
productsRouter.put('/:id', isAuthorized, productsController.update);
productsRouter.delete('/:id', isAuthorized, productsController.delete);