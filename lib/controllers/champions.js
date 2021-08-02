import { Router } from 'express';
import Champion from '../models/Champion';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const champion = await Champion.insert(req.body);

      res.send(champion);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const champion = { 
        name: 'Ahri', 
        role: 'mage', 
        damage: 'ability power', 
        difficulty: 2,
        region: 'Ionia',
        id: '1'
      };
      res.send(champion);
    } catch (err) {
      next(err);
    }
  });
