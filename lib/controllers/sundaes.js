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
      const sundae = { id: '1', flavor: 'chocolate and strawberry', scoops: 2, toppings: 'hot fudge', additionalToppings: 'chocolate chips' };
      res.send(sundae);
    } catch (err){
      next(err);
    }
  });


