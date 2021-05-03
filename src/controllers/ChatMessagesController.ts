import express, { Request, Response, NextFunction, RouterOptions, Router } from 'express';
import { ChatMessage } from '../db/models/ChatMessage';

export class ChatMessagesController {

    get = async(req: Request, res: Response) => {
        try {
            const messageId: string | null = req.params.id;
            if (messageId) {
                const message = await ChatMessage.findById(messageId);
                if (!message) {
                    res.status(404).json({ description: 'Resource not found'});
                    return;
                }
    
                res.status(200).send(message);
                return;
            }
    
            const messages = await ChatMessage.find();
            res.status(200).json(messages)
        } catch (error) {
            res.status(500).json({ error: 'Whoops! Something went wrong...;' })
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            if(!req.body.email || !req.body.message) {
              res.status(400).json({error: 'Few parameters were provided. The message can not be created.'});
              return;
            }
            
            const message = new ChatMessage(req.body);
            message.save((err: Error, newMessage: typeof ChatMessage) => {
                if (err) {
                    res.status(400).json({error: 3, description: 'Something went wrong...'});
                    return;
                }
                    
                res.status(200).json(newMessage);
            });
            
        } catch (e) {
            res.status(500).json({error: 'Something went wrong...'});
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            const messageId: string = req.params.id;
            if(!messageId) {
                res.status(400).json({error: 'Message id must be provided.'});
                return;
            }
    
            if(!req.body.email || !req.body.message) {
                res.status(400).json({error: 'Few parameters were provided. The message can not be created.'});
                return;
            }
    
            const message = await ChatMessage.findById(messageId);
            if (!message) {
                res.status(404).json({error: 3, description: 'Message not found'});
                return;
            }

            Object.keys(req.body).forEach((field: any) => message[field] = req.body[field]);
            message.save( (err: Error, newMessage: typeof ChatMessage) => {
                if (err) {
                    res.status(400).json({error: 'Whoops! Something went wrong...'});
                    return;
                }

                res.status(200).json({message: 'updated', chatMessage: newMessage});
            });
        
        } catch (e) {
          console.log(e)
            res.status(400).json({error: "Whoops! Something went wrong..."});
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const messageId: string = req.params.id;
            if (!messageId) {
                res.status(400).json({ error: 'Few parameters were provided. The message can not be deleted' });
                return;
            }

            const message = await ChatMessage.findById(messageId);
            const isDeleted = message.remove();
        
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