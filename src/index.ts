import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import { productsRouter } from './routers/ProductsRouter';
import { shoppingCartRouter } from './routers/ShoppingCartsRouter';
import { chatMessagesRouter } from './routers/ChatMessagesRouter';

const port: number = Number(process.env.PORT) || 8080;
export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req: Request, res:Response) => {
    res.send('An alligator approaches!');
});

app.use('/products', productsRouter);
app.use('/shopping_cart', shoppingCartRouter);
app.use('/chat_messages', chatMessagesRouter);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});


