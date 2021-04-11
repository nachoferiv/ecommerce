import fs from 'fs';
import path from 'path';
import { Product } from '../entities/Product';

export class DALProducts { 
    
    private filepath: string = path.join(__dirname, '/storage/products.json')

    read = async () => {
        try {
            const fileContent: Buffer = await fs.promises.readFile(this.filepath);
            const parsedData = JSON.parse(fileContent.toString())
            const products: Array<Product> = parsedData.map( (p: any) => new Product(p.id, p.name, p.description, p.code, p.image, p.price, p.stock, p.timestamp));

            return products;

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
            const exist = fileContent.filter( p => p.code === params.code);

            if (exist.length !== 0) 
                return false;
            
            const currentTimestamp: number = Date.now();
            const newProduct = new Product(id, params.name, params.description, params.code, params.image, params.price, params.stock, currentTimestamp);

            fileContent.push(newProduct)

            await fs.promises.writeFile(this.filepath, JSON.stringify(fileContent, null, '\t'))  
            
            return newProduct;

        } catch(e) {
            console.log(e)
            return false;
        }
    }

    update = async(product: Product) => {
        try {
            const fileContent = await this.read();
            const exists = fileContent.filter( p => p.id === product.id);

            if (exists.length === 0) 
                return null;
            
            fileContent.map( p => {
                if (p.id === product.id) {
                    p.name = product.name
                    p.description = product.description;
                    p.code = product.code;
                    p.image = product.image;
                    p.price = product.price;
                    p.stock = product.stock;
                    p.timestamp = product.timestamp;
                }
            });

            await fs.promises.writeFile(this.filepath, JSON.stringify(fileContent, null, '\t'))  
            return fileContent.filter( p => p.id === product.id)[0];
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    delete = async(id: number) => {
        try {
            const fileContent = await this.read();
            const productToDelete = fileContent.filter( p => p.id === id);
    
            if (productToDelete.length === 0) 
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

