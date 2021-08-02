import { Router } from 'express';
import Trial from '../models/Trial';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const trial = await Trial.insert(req.body);

      res.send(trial);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const trial = await Trial.getById(id);
      res.send(trial);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const trials = [
        {
          name: 'The Dancing Plague',
          level: 73,
          boss: 'Titania',
          expansion: 'Shadowbringers',
          id: '1'
        }, 
        { 
            
          name: 'The Crown of the Immaculate',
          level: 79,
          boss: 'Innocence',
          expansion: 'Shadowbringers',
          id:'2'
        }, { 
            
          name: 'The Dying Grasp',
          level: 80,
          boss: 'Hades',
          expansion: 'Shadowbringers',
          id: '3'
        }
      ];

      res.send(trials);
    } catch (err) {
      next(err);
    }
  });
