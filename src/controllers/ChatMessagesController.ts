import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { isAdmin, isAuthorized } from '../middlewares/Auth';
import { ChatMessage } from '../entities/ChatMessage';
import { DALChatMessages } from '../db/DALChatMessages';

export class ChatMessagesController {
    private db: DALChatMessages = new DALChatMessages();

    get = async(req: Request, res: Response) => {
        try {
            const messageId: number | null = req.params.id?  Number(req.params.id) : null;
            if (messageId) {
                const allMessages = await this.db.read();
                const message = allMessages.filter( (p: ChatMessage) => p.id === messageId)[0];
                if (!message) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(message);
                return;
            }
    
            const messages = await this.db.read();
            res.status(200).json(messages)
        } catch (error) {
            res.status(500).json({ error: 0, description: 'Whoops! Something went wrong...;' })
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            if(!req.body.email || !req.body.message) {
              res.status(400).json({error: 2, description: 'Few parameters were provided. The message can not be created.'});
              return;
            }
    
            const creatdMessage = await this.db.save(req.body);
            if (!creatdMessage) {
              res.status(400).json({error: 3, description: 'Something went wrong...'});
              return;
            } 
    
            res.status(200).json(creatdMessage);
        } catch (e) {
            console.log(e.message);
            res.status(500).json({error: 1, description: 'Something went wrong...'});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            const messageId = Number(req.params.id);
            if(!messageId) {
                res.status(400).json({error: 2, description: 'Message id must be provided.'});
                return;
            }
    
            if(!req.body.email || !req.body.message || !req.body.tiemstamp) {
                res.status(400).json({error: 2, description: 'Few parameters were provided. The message can not be created.'});
                return;
            }
    
            const message = new ChatMessage(messageId, req.body.email, req.body.message, req.body.timestamp);
            const status = await this.db.update(message);
        
            if (!status) {
              res.status(400).json({error: 'The message does not exist'});
              return;
            } else {
                res.status(200).json({message: 'updated', chatMessage: status});
            }
        } catch (e) {
          console.log(e)
            res.status(400).json({error: "Whoops! Something went wrong..."});
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const messageId = Number(req.params.id);
            if (!messageId) {
                res.status(400).json({ error: 'Few parameters were provided. The message can not be deleted' });
                return;
            }
            const isDeleted = await this.db.delete(messageId);
        
            if (!isDeleted) {
              res.status(400).json({ error: 'The message does not exist' });
              return;
            } else {
                res.status(200).json({ message: 'deleted' });
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({error: "Whoops! Something went wrong..."});
        }
    }
}