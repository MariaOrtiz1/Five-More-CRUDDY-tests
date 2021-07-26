import { Router } from 'express';
import Bunny from '../models/Bunny';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const bunny = await Bunny.insert(req.body);

      res.send(bunny);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const bunny = await Bunny.getById(id);
      res.send(bunny);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const bunnies = await Bunny.getAll();

      res.send(bunnies);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, mainColor, secondColor, ears } = req.body;
      const updatedBunny = await Bunny.updateById(id, { name, mainColor, secondColor, ears });

      res.send(updatedBunny);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const bunny = await Bunny.deleteById(id);

      res.send({ message : `${bunny.name} has hopped away!` });
    } catch (err) {
      next(err);
    }
  });
