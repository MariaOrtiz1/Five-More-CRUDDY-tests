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

  it('gets all champions via GET', async () => {
    const aphelios = await Champion.insert({ 
      name: 'Aphelios', 
      role: 'marksman', 
      damage: 'attack damage', 
      difficulty: 3,
      region: 'Targon'
    });

    const gragas = await Champion.insert({ 
      name: 'Gragas', 
      role: 'fighter', 
      damage: 'ability power', 
      difficulty: 2,
      region: 'Freljord'
    });

    const pantheon = await Champion.insert({ 
      name: 'Pantheon', 
      role: 'fighter', 
      damage: 'attack damage', 
      difficulty: 2,
      region: 'Targon'
    });

    const res = await request(app)
      .get('/api/v1/champions');

    expect(res.body).toEqual([aphelios, gragas, pantheon]);
  });

  it('updates a champion by id via PUT', async () => {
    const kayle = await Champion.insert({ 
      name: 'Kayle', 
      role: 'fighter', 
      damage: 'attack damage, and ability power', 
      difficulty: 2,
      region: 'Targon'
    });

    const res = await request(app)
      .put(`/api/v1/champions/${kayle.id}`)
      .send({ region: 'Demacia' });

    expect(res.body).toEqual({ ...kayle, region: 'Demacia' });
  });
});
