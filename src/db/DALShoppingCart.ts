import fs from 'fs';
import path from 'path';
import { ShoppingCart } from '../entities/ShoppingCart';

export class DALShoppingCart {

    private filepath: string = path.join(__dirname, '/storage/shopping_carts.json');

    read = async() => {
        try {
            const fileContent: Buffer = await fs.promises.readFile(this.filepath);
            const parsedData = JSON.parse(fileContent.toString())
            const shoppingCarts: Array<ShoppingCart> = parsedData.map( (s: any) => new ShoppingCart(s.id, s.timestamp, s.products));

            return shoppingCarts;

        } catch(e) {
            console.log(e)
            return [];
        }
    }

    save = async(params: any) => {
        try {
            const fileContent = await this.read();
            const latestObj = fileContent.reduce((prev, curr) => {
                return (prev.id > curr.id) ?  prev : curr
            });

            const id = latestObj.id + 1;
            const currentTimestamp: number = Date.now();
            const newShoppingCart = new ShoppingCart(id, currentTimestamp, params.products);

            fileContent.push(newShoppingCart)

            await fs.promises.writeFile(this.filepath, JSON.stringify(fileContent, null, '\t'))  
            
            return newShoppingCart;

        } catch(e) {
            console.log(e)
            return null;
        }
    }

    delete = async(id: number) => {
        try {
            const fileContent = await this.read();
            const shoppingCartToDelete = fileContent.filter( s => s.id === id);
    
            if (shoppingCartToDelete.length === 0) 
                return false;
            
            const editedFileContent = fileContent.filter( p => p.id !== id);
    
            await fs.promises.writeFile(this.filepath, JSON.stringify(editedFileContent, null, '\t'))  
            return true;
    
        } catch(e) {
            console.log(e)
            return false
        }
    }
}