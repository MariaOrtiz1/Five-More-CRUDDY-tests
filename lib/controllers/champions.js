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
      const { id } = req.params;
      const champion = await Champion.getById(id);
      res.send(champion);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const champions = [
        { 
          name: 'Aphelios', 
          role: 'marksman', 
          damage: 'attack damage', 
          difficulty: 3,
          region: 'Targon',
          id: '1'
        }, 
        { 
          name: 'Gragas', 
          role: 'fighter', 
          damage: 'ability power', 
          difficulty: 2,
          region: 'Freljord',
          id: '2'
        }, 
        { 
          name: 'Pantheon', 
          role: 'fighter', 
          damage: 'attack damage', 
          difficulty: 2,
          region: 'Targon',
          id: '3'
        }
      ];

      res.send(champions);
    } catch (err) {
      next(err);
    }
  });

