import path from 'path';
const options = {
    client: 'sqlite3',
    connection: {
        //host: process.env.DB_URL,
        //user: process.env.DB_USER,
        //password: process.env.DB_PASSWORD,
        //database: process.env.DB_NAME
        filename: path.join(__dirname, './sql_storage/ecommerce.sqlite')
    },
    useNullAsDefault: true
};

export default options;