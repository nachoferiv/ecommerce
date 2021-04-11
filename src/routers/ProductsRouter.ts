import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { ProductsController } from '../controllers/ProductController';
import { isAdmin, isAuthorized } from '../middlewares/Auth';

export const productsRouter: Router = express.Router();

const productsController = new ProductsController();

productsRouter.get('/products/:id?', async(req: Request, res: Response) => {
    try {
        const productId: number = Number(req.params.id);

        if (productId) {
            const product = await productsController.getById(productId);
            if (!product) {
                res.status(404).json({ description: 'Resource not found'});
                return;
            }

            res.status(200).send(product);
            return;
        }

        const products = await productsController.getAll();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' })
    }
});

productsRouter.post('/products', isAuthorized, async(req: Request, res: Response) => {
    try {
        if(!req.body.name || !req.body.description || !req.body.code || !req.body.image || !req.body.price || !req.body.stock) {
          res.status(400).json({error: 2, description: 'Few parameters were provided. The product can not be created.'});
          return;
        }

        const createdProduct = await productsController.create(req.body);

        if (!createdProduct) {
          res.status(400).json({error: 3, description: 'Something went wrong...'});
          return;
        } 

        res.status(200).json(createdProduct);
    } catch (e) {
        res.status(500).json({error: 1, description: 'Something went wrong...'});
    }
});

productsRouter.put('/products/:id', isAuthorized, async(req: Request, res: Response) => {
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

        const productBody = {
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock
        }
        const status = await productsController.update(productBody);
    
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
});

productsRouter.delete('/products/:id', isAuthorized, async(req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        if (!productId) {
            res.status(400).json({ error: 'Few parameters were provided. The product can not be deleted' });
            return;
        }
        const isDeleted = await productsController.delete(productId)
    
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