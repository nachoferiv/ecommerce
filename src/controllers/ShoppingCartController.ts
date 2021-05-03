import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { ShoppingCart } from '../db/models/ShoppingCart';

export class ShoppingCartsController {
    get = async(req: Request, res: Response) => {
        try {
            const shoppingCartId: string | null = req.params.id;
    
            if (shoppingCartId) {
                const shoppingCart = await ShoppingCart.findById(shoppingCartId);
                if (!shoppingCart) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(shoppingCart);
                return;
            }
    
            const shoppingCarts = await ShoppingCart.find();
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
            const shoppingCart = new ShoppingCart(req.body)
            const shoppingCartCreated = shoppingCart.save();
      
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
            const shoppingCartId: string = req.params.id;
            if (!shoppingCartId) {
                res.status(400).json({ error: 'Few parameters were provided. The shopping cart can not be deleted' });
                return;
            }
    
            const shoppingCart = await ShoppingCart.findById(shoppingCartId)
            const isDeleted = shoppingCart.remove();
        
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