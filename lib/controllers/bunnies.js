import { Router } from 'express';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      res.send({ id: '1', name: 'vaati', mainColor: 'white', secondColor: 'black', ears: 'long' });
    } catch (err) {
      next(err);
    }
  });
