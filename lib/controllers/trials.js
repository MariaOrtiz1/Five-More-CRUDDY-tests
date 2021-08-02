import { Router } from 'express';
import Trial from '../models/Trial';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const trial = await Trial.insert(req.body);

      res.send(trial);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const trial = { name: 'Castrum Fluminis', level: 70, boss: 'Tsukuyomi', expansion: 'Stormblood', id: '1' };
      res.send(trial);
    } catch (err) {
      next(err);
    }
  });
