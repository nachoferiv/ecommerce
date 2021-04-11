import express, { Request, Response, NextFunction, RouterOptions, Router} from 'express';
import { ShoppingCartsController } from '../controllers/ShoppingCartController';
import { isAdmin, isAuthorized } from '../middlewares/Auth';

export const shoppingCartRouter: Router = express.Router();
const shoppingCartController = new ShoppingCartsController();

shoppingCartRouter.get('/shopping_cart/:id?', async(req: Request, res: Response) => {
    try {
        const shoppingCartId: number = Number(req.params.id);

        if (shoppingCartId) {
            const shoppingCart = await shoppingCartController.getById(shoppingCartId);
            if (!shoppingCart) {
                res.status(404).json({ description: 'Resource not found'});
                return;
            }

            res.status(200).send(shoppingCart);
            return;
        }

        const shoppingCarts = await shoppingCartController.getAll();
        res.status(200).json(shoppingCarts)
    } catch (error) {
        res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' })
    }
});

shoppingCartRouter.post('/shopping_cart', isAuthorized, async(req: Request, res: Response) => {
    try {

        if(!req.body.products) {
          res.status(400).json({error: 2, description: 'Few parameters were provided. The shopping cart can not be created.'});
          return;
        }

        const shoppingCartCreated = await shoppingCartController.create(req.body);
  
        if (!shoppingCartCreated) {
          res.status(400).json({error: 3, description: 'Something went wrong...'});
          return;
        } 

        res.status(200).json(shoppingCartCreated);
    } catch (e) {
        res.status(500).json({error: 1, description: 'Something went wrong...'});
    }
});

shoppingCartRouter.delete('/shopping_cart/:id', isAuthorized, async(req: Request, res: Response) => {
    try {
        const shoppingCartId = Number(req.params.id);
        if (!shoppingCartId) {
            res.status(400).json({ error: 'Few parameters were provided. The shopping cart can not be deleted' });
            return;
        }

        const isDeleted = await shoppingCartController.delete(shoppingCartId)
    
        if (!isDeleted) {
          res.status(400).json({ error: 'The product does not exist' });
          return;
        } else {
            res.status(200).json({ message: 'deleted' });
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({error: "Whoops! Something went wrong..."});
    }
});