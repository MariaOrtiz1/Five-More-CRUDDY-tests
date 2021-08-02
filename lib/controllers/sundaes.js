import { Router } from 'express';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const sundae = { flavor: 'vanilla', scoops: '3', toppings: 'sprinkles', additionalToppings: 'none' };
      
      res.send(sundae);
    } catch (err) {
      next(err);
    }
  });

