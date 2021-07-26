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
      const bunny = { id: '1', name: 'nesma', mainColor: 'black', secondColor: 'none', ears: 'long' };
      res.send(bunny);
    } catch (err) {
      next(err);
    }
  });
