import { Router } from 'express';
import Character from '../models/Character';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const character = { id: '1', name: 'Amelia Silverwind', class: 'witch', race: 'changeling', gender: 'female' };

      res.send(character);
    } catch (err) {
      next(err);
    }
  });
