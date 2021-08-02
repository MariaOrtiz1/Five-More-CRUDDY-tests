import { Router } from 'express';
import Character from '../models/Character';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const character = await Character.insert(req.body);

      res.send(character);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const character = { 
        id: '1',
        name: 'Amelia Silverwind', 
        jobClass: 'witch', 
        race: 'changeling', 
        gender: 'female' };
      res.send(character);
    } catch (err) {
      next(err);
    }
  });
