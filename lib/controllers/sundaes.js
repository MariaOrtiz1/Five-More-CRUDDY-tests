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
      const { id } = req.params;
      const sundae = await Sundae.getById(id);
      res.send(sundae);
    } catch (err){
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const sundaes = await Sundae.getAll();

      res.send(sundaes);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { flavor, scoops, toppings, additionalToppings } = req.body;
      const updatedSundae = await Sundae.updateById(id, { flavor, scoops, toppings, additionalToppings });

      res.send(updatedSundae);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const sundae = await Sundae.deleteById(id);
      res.send({ message : `Your ${sundae.flavor} sundae order has been deleted`, });
    } catch (err) {
      next(err);
    }

  });
