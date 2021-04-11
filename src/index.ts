import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import { productsRouter } from './routers/ProductsRouter';
import { shoppingCartRouter } from './routers/ShoppingCartsRouter';

const port: number = Number(process.env.PORT) || 8080;
export const app: Application = express();
const isAdmin = false;
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (!isAdmin) {
        res.status(401).json({ error: 'Not authorized for this action'});
        return;
    }
    next();
}

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req: Request, res:Response) => {
    res.send('An alligator approaches!');
});

app.use(productsRouter);
app.use(shoppingCartRouter);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});


