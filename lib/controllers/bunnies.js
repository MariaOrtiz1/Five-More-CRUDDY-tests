import { Router } from 'express';
import Bunny from '../models/Bunny';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const bunny = await Bunny.insert(req.body);

      res.send(bunny);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const bunny = await Bunny.getById(id);
      res.send(bunny);
    } catch (err) {
      next(err);
    }
  });
