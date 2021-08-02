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
  });
