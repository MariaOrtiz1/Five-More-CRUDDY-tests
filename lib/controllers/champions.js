import { Router } from 'express';
import Champion from '../models/Champion';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const champion = { 
        name: 'Luxanna Crownguard', 
        role: 'mage', 
        damage: 'ability power', 
        difficulty: 2,
        region: 'Demacia',
        id: '1'
      };

      res.send(champion);
    } catch (err) {
      next(err);
    }
  });
