import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Champion from '../lib/models/Champion.js';

describe('champion routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a champion via POST', async () => {
    const lux = { 
      name: 'Luxanna Crownguard', 
      role: 'mage', 
      damage: 'ability power', 
      difficulty: 2,
      region: 'Demacia' };
    const res = await request(app)
      .post('/api/v1/bunnies')
      .send(lux);
  
    expect(res.body).toEqual({
      id: '1',
      ...lux
    });
  });
});
