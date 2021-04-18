import knex, { Knex } from 'knex';
import options from './knexOptions';
import { ChatMessage } from '../entities/ChatMessage';

export class DALChatMessages {
    constructor() {
        let conn: Knex = knex(options);
        conn.schema.hasTable('chat_messages').then( exists => {
            if (!exists) {
                conn.schema.createTable('chat_messages', table => {
                    table.increments('id').notNullable().primary();
                    table.string('email').notNullable();
                    table.string('message').notNullable();
                    table.timestamp('timestamp').notNullable();
                })
                .then(() => { console.log('OK')} )
                .catch( (err) => { 
                    console.log('Error creating messages table'); 
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
            const messages: Array<ChatMessage> = [];

            await conn.from('chat_messages').select('*')
                .then( rows => {
                    for (let row of rows) {
                        const message: ChatMessage = new ChatMessage(
                            row['id'],
                            row['email'],
                            row['message'],
                            row['timestamp']
                        );

                        messages.push(message);
                    }
                })
                .catch( err => {
                    console.log('Error trying to get products');
                    throw err;
                })
                .finally( () => {
                    conn.destroy();
                })

            return messages;
        } catch(e) {
            console.log(e)
            return [];
        }
    }

    save = async(params: any) => {
        try {
            let currentTimestamp = new Date();

            const row = {
                email: params.email, 
                message: params.message,
                timestamp: currentTimestamp
            };

            let conn: Knex = knex(options);

            const newMessage = conn('chat_messages').insert(row)
                .then( async(result) => {
                    const id = result[0];
                    let rows = await conn.from('chat_messages').select('*').where('id','=', id);
                    for (let row of rows) {
                        const message: ChatMessage = new ChatMessage(
                            row['id'],
                            row['email'],
                            row['message'],
                            row['timestamp']
                        );
                        return message;
                    }
                    
                })
                .catch(err => console.log(err))
                .finally(() => conn.destroy());

            return newMessage;
        } catch(e) {
            console.log(e.message);
            return false;
        }
    }

    update = async(params: any) => {
        try {
            let currentTimestamp = new Date();
            let conn: Knex = knex(options);

            const updatedMessage = await conn.from('chat_messages').where('id', '=', params.id).update({
                email: params.email, 
                message: params.message,
                timestamp: currentTimestamp
            })
            .then( async() => {
                    let rows = await conn.from('chat_messages').select('*').where('id','=', params.id);
                    for (let row of rows) {
                        const message: ChatMessage = new ChatMessage(
                            row['id'],
                            row['email'],
                            row['message'],
                            row['timestamp']
                        );

                        return message;
                    }
                    
                })
            .catch(err => {
                    console.log(err);
                    return null;
                })
            .finally(() => conn.destroy());
            
            return updatedMessage;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    delete = async(id: number) => {
        try {
            let conn: Knex = knex(options);
            
            const isDeleted = await conn.from('chat_messages').where('id', '=', id).delete()
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