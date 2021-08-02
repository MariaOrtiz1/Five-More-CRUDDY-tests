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
      const characters = [{ name: 'Amelia Silverwind', 
        jobClass: 'witch', 
        race: 'changeling', 
        gender: 'female', id: '1' }, { name: 'Kyvernys Gracewind', 
        jobClass: 'champion/monk', 
        race: 'human', 
        gender: 'male', id: '2' }, { name: 'Wesley Owens', 
        jobClass: 'magus', 
        race: 'human', 
        gender: 'male', id: '3' }, { name: 'Volyun Junaiper', 
        jobClass: 'druid', 
        race: 'elf', 
        gender: 'male', id: '4' }];

      res.send(characters);
    } catch (err) {
      next(err);
    }
  });
