import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('bunny routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a bunny via POST', async () => {
    const vaati = { name: 'vaati', mainColor: 'white', secondColor: 'black', ears: 'long' };
    const res = await request(app)
      .post('/api/v1/bunnies')
      .send(vaati);

    expect(res.body).toEqual({
      id: '1',
      ...vaati
    });
  });
});
