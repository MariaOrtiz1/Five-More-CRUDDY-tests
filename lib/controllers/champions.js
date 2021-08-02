import { Router } from 'express';
import Champion from '../models/Champion';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const champion = await Champion.insert(req.body);

      res.send(champion);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const champion = await Champion.getById(id);
      res.send(champion);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const champions = await Champion.getAll();

      res.send(champions);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, role, damage, difficulty, region } = req.body;
      const updatedChampion = await Champion.updateById(id, { name, role, damage, difficulty, region });

      res.send(updatedChampion);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      res.send({ message : 'Gankplank has been deleted', });
    } catch (err) {
      next(err);
    }
  });


