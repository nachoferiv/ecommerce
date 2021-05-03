import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { Product } from '../db/models/Product';

export class ProductsController {

    get = async(req: Request, res: Response) => {
        try {
            const productId: string = req.params.id;
    
            if (productId) {
                const product = await Product.findById(req.params.id);
                if (!product) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(product);
                return;
            }
    
            const products = await Product.find();
            res.status(200).json(products)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Whoops! Something went wrong...;' })
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            if(!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
              res.status(400).json({error: 2, description: 'Few parameters were provided. The product can not be created.'});
              return;
            }
    
            const product = new Product(req.body);
            product.save( (err: Error, newProduct: typeof Product) => {
                if (err)
                    res.status(400).json({error: 'Something went wrong...'});

                res.status(200).json(newProduct);
            });
            
        } catch (e) {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            const productId = req.params.id;
            if(!productId) {
                res.status(400).json({error: 'Product id must be provided.'});
                return;
            }
    
            if(!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
                res.status(400).json({error: 'Few parameters were provided. The product can not be updated.'});
                return;
            }

            const product = await Product.findOne({_id: productId});
            if (!product) {
                res.status(404).json({error: 'Product not found'});
                return;
            }
            
            Object.keys(req.body).forEach((field: any) => product[field] = req.body[field]);
            product.save( (err: Error, newProduct: typeof Product) => {
                if (err) {
                    res.status(400).json({error: 'Whoops! Something went wrong...'});
                    return;
                }
                   
                res.status(200).json({message: 'updated', product: newProduct});    
            });
        } catch (e) {
          console.log(e)
            res.status(400).json({error: "Whoops! Something went wrong..."});
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const productId = req.params.id;
            if (!productId) {
                res.status(400).json({ error: 'Few parameters were provided. The product can not be deleted' });
                return;
            }

            const product = await Product.findById(productId);
            const isDeleted = product.remove();
        
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