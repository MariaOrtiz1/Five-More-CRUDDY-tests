import { Router } from 'express';
import Sundae from '../models/Sundae';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const sundae = await Sundae.insert(req.body);
      
      res.send(sundae);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const sundae = await Sundae.getById(id);
      res.send(sundae);
    } catch (err){
      next(err);
    }
  });


