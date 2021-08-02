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
      const { id } = req.params;
      const trial = await Trial.getById(id);
      res.send(trial);
    } catch (err) {
      next(err);
    }
  });
