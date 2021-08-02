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
      .post('/api/v1/champions')
      .send(lux);
  
    expect(res.body).toEqual({
      id: '1',
      ...lux
    });
  });

  it('gets a champion by id via GET', async () => {
    const ahri = await Champion.insert({ 
      name: 'Ahri', 
      role: 'mage', 
      damage: 'ability power', 
      difficulty: 2,
      region: 'Ionia'
    });

    const res = await request(app).get(`/api/v1/champions/${ahri.id}`);

    expect(res.body).toEqual(ahri);
  });
});
