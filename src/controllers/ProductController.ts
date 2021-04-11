import { Product } from '../entities/Product';
import { DALProducts } from '../db/DALProducts';

export class ProductsController {
    private db: DALProducts = new DALProducts();

    getAll = async() => {
        const allProducts = await this.db.read();
        return allProducts;
    }

    getById = async(id: number) => {
        const allProducts = await this.db.read();
        const product = allProducts.filter( (p: Product) => p.id === id)[0];
        return product;
    }

    create = async(params: any) => {
        const newProduct = this.db.save(params);
        return newProduct;
    }

    update = async(params: any) => {
        const product = new Product(params.id, params.name, params.description, params.code, params.image, params.price, params.stock, params.timestamp);
        const updatedProduct = await this.db.update(product);
        return updatedProduct;
    }

    delete = async(id: number) => {
        const isDeleted = await this.db.delete(id);
        return isDeleted
    }
}