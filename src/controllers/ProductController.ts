import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { isAdmin, isAuthorized } from '../middlewares/Auth';
import { Product } from '../entities/Product';
import { DALProducts } from '../db/DALProducts';

export class ProductsController {
    private db: DALProducts = new DALProducts();

    get = async(req: Request, res: Response) => {
        try {
            const productId: number = Number(req.params.id);
    
            if (productId) {
                const allProducts = await this.db.read();
                const product = allProducts.filter( (p: Product) => p.id === productId)[0];
                if (!product) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(product);
                return;
            }
    
            const products = await this.db.read();
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' })
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            if(!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
              res.status(400).json({error: 2, description: 'Few parameters were provided. The product can not be created.'});
              return;
            }
    
            const createdProduct = await this.db.save(req.body);
            if (!createdProduct) {
              res.status(400).json({error: 3, description: 'Something went wrong...'});
              return;
            } 
    
            res.status(200).json(createdProduct);
        } catch (e) {
            res.status(500).json({error: 1, description: 'Something went wrong...'});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            const productId = Number(req.params.id);
            if(!productId) {
                res.status(400).json({error: 2, description: 'Product id must be provided.'});
                return;
            }
    
            if(!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
                res.status(400).json({error: 2, description: 'Few parameters were provided. The product can not be created.'});
                return;
            }
    
            const product = new Product(Number(req.params.id), req.body.name, req.body.description, req.body.code, req.body.image, req.body.price, req.body.stock, req.body.timestamp);
            const status = await this.db.update(product);
        
            if (!status) {
              res.status(400).json({error: 'The product does not exist'});
              return;
            } else {
                res.status(200).json({message: 'updated', product: status});
            }
        } catch (e) {
          console.log(e)
            res.status(400).json({error: "Whoops! Something went wrong..."});
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const productId = Number(req.params.id);
            if (!productId) {
                res.status(400).json({ error: 'Few parameters were provided. The product can not be deleted' });
                return;
            }
            const isDeleted = await this.db.delete(productId);
        
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