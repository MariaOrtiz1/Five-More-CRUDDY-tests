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
      const { id } = req.params;
      const character = await Character.getById(id);
      res.send(character);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const characters = await Character.getAll();

      res.send(characters);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const updatedBunny = { name: 'Wesley Owens', jobClass: 'magus', race: 'human', gender: 'male', id: '1' };

      res.send(updatedBunny);
    } catch (err) {
      next(err);
    }
  });
