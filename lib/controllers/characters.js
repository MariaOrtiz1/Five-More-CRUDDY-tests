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
      const { id } = req.params;
      const { name, jobClass, race, gender } = req.body;
      const updatedCharacter = await Character.updateById(id, { name, jobClass, race, gender });

      res.send(updatedCharacter);
    } catch (err) {
      next(err);
    }
  })
  
  .delete('/:id', async (req, res, next) => {
    try {
      const character = { name: 'Voithys',
        jobClass: 'monk',
        race: 'aasimar',
        gender: 'male' };

      res.send({ message : `${character.name} has left the party`, });
    } catch (err) {
      next(err);
    }
  });
