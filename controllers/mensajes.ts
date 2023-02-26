// controllers/MessageController.ts

import { Request, Response } from 'express';
import MessageModel from '../models/mensaje';

class MessageController {
  public async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const messages = await MessageModel.findAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async addMessage(req: Request, res: Response): Promise<void> {
    try {
      const { sender, text } = req.body;
      const message = await MessageModel.create({ sender, text });
      res.status(201).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new MessageController();
