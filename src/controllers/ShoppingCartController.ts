import { DALShoppingCart } from '../db/DALShoppingCart';
import { ShoppingCart } from '../entities/ShoppingCart';

export class ShoppingCartsController {
    private db: DALShoppingCart = new DALShoppingCart();

    getAll = async() => {
        const shoppingCarts = await this.db.read();
        return shoppingCarts;
    }

    getById = async(id: number) => {
        const allShoppingCarts = await this.db.read();
        const shoppingCart = allShoppingCarts.filter( (s: ShoppingCart) => s.id === id)[0];
        return shoppingCart;
    }

    create = async(params: any) => {
        const newShoppingCart = await this.db.save(params);
        return newShoppingCart; 
    }
    
    delete = async(id: number) => {
        const isDeleted = await this.db.delete(id);
        return isDeleted
    }
}