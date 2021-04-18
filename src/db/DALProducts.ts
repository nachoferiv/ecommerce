import knex, { Knex } from 'knex';
import options from './knexOptions';
import { Product } from '../entities/Product';

export class DALProducts { 
    constructor() {
        let conn: Knex = knex(options);
        conn.schema.hasTable('products').then( exists => {
            if (!exists) {
                conn.schema.createTable('products', table => {
                    table.increments('id').notNullable().primary();
                    table.string('name').notNullable();
                    table.string('description').notNullable();
                    table.string('code').notNullable().unique();
                    table.string('image').notNullable();
                    table.decimal('price').notNullable().unsigned();
                    table.integer('stock').notNullable().unsigned();
                    table.timestamp('timestamp').notNullable();
                })
                .then(() => { console.log('OK')} )
                .catch( (err) => { 
                    console.log('Error creating products table'); 
                    throw err;
                })
            }
        })
        .finally(() => {
            conn.destroy()
        })
    }

    read = async () => {
        try {
            let conn: Knex = knex(options);
            const products: Array<Product> = [];

            await conn.from('products').select('*')
                .then( rows => {
                    for (let row of rows) {
                        const product: Product = new Product(
                            row['id'],
                            row['name'],
                            row['description'],
                            row['code'],
                            row['image'],
                            row['price'],
                            row['stock'],
                            row['timestamp'],
                        );

                        products.push(product);
                    }
                })
                .catch( err => {
                    console.log('Error trying to get products');
                    throw err;
                })
                .finally( () => {
                    conn.destroy();
                })
            
            return products;
        } catch(e) {
            console.log(e)
            return [];
        }
    }

    save = async(params: any) => {
        try {
            let currentTimestamp = new Date();

            const row = {
                name: params.name, 
                description: params.description, 
                code: params.code, 
                image: params.image, 
                price: params.price, 
                stock: params.stock, 
                timestamp: currentTimestamp
            };

            let conn: Knex = knex(options);

            const newProduct = conn('products').insert(row)
                .then( async(result) => {
                    const id = result[0];
                    let rows = await conn.from('products').select('*').where('id','=', id);
                    for (let row of rows) {
                        const product: Product = new Product(
                            row['id'],
                            row['name'],
                            row['description'],
                            row['code'],
                            row['image'],
                            row['price'],
                            row['stock'],
                            row['timestamp'],
                        );
                        return product;
                    }
                    
                })
                .catch(err => console.log(err))
                .finally(() => conn.destroy());

            return newProduct;
        } catch(e) {
            console.log(e.message);
            return false;
        }
    }

    update = async(params: any) => {
        try {
            let currentTimestamp = new Date();
            let conn: Knex = knex(options);

            const product = await conn.from('products').where('id', '=', params.id).update({
                name: params.name, 
                description: params.description,
                image: params.image, 
                price: params.price, 
                stock: params.stock, 
                timestamp: currentTimestamp
            })
            .then( async() => {
                    let rows = await conn.from('products').select('*').where('id','=', params.id);
                    for (let row of rows) {
                        const product: Product = new Product(
                            row['id'],
                            row['name'],
                            row['description'],
                            row['code'],
                            row['image'],
                            row['price'],
                            row['stock'],
                            row['timestamp'],
                        );

                        return product;
                    }
                    
                })
            .catch(err => {
                    console.log(err);
                    return null;
                })
            .finally(() => conn.destroy());
            
            return product;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    delete = async(id: number) => {
        try {
            let conn: Knex = knex(options);
            
            const isDeleted = await conn.from('products').where('id', '=', id).delete()
            .then( async() => true)
            .catch(err => {
                    console.log(err);
                    return false;
                })
            .finally(() => conn.destroy());
            
            return isDeleted;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

