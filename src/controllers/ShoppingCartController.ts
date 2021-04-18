import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { isAdmin, isAuthorized } from '../middlewares/Auth';
import { DALShoppingCart } from '../db/DALShoppingCart';
import { ShoppingCart } from '../entities/ShoppingCart';

export class ShoppingCartsController {
    private db: DALShoppingCart = new DALShoppingCart();

    get = async(req: Request, res: Response) => {
        try {
            const shoppingCartId: number = Number(req.params.id);
    
            if (shoppingCartId) {
                const allShoppingCarts = await this.db.read();
                const shoppingCart = allShoppingCarts.filter( (s: ShoppingCart) => s.id === shoppingCartId)[0];
                if (!shoppingCart) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(shoppingCart);
                return;
            }
    
            const shoppingCarts = await this.db.read();
            res.status(200).json(shoppingCarts)
        } catch (error) {
            res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' })
        }
    }

    create = async(req: Request, res: Response) => {
        try {
    
            if(!req.body.products) {
              res.status(400).json({error: 2, description: 'Few parameters were provided. The shopping cart can not be created.'});
              return;
            }
    
            const shoppingCartCreated = await this.db.save(req.body);
      
            if (!shoppingCartCreated) {
              res.status(400).json({error: 3, description: 'Something went wrong...'});
              return;
            } 
    
            res.status(200).json(shoppingCartCreated);
        } catch (e) {
            res.status(500).json({error: 1, description: 'Something went wrong...'});
        }
    }
    
    delete = async(req: Request, res: Response) => {
        try {
            const shoppingCartId = Number(req.params.id);
            if (!shoppingCartId) {
                res.status(400).json({ error: 'Few parameters were provided. The shopping cart can not be deleted' });
                return;
            }
    
            const isDeleted = await this.db.delete(shoppingCartId);
        
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
    }
}