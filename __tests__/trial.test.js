import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Trial from '../lib/models/Trial.js';

describe('trial routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a trial via POST', async () => {
    const tsukuyomi = { name: 'Castrum Fluminis', level: 70, boss: 'Tsukuyomi', expansion: 'Stormblood' };
    const res = await request(app)
      .post('/api/v1/trials')
      .send(tsukuyomi);
  
    expect(res.body).toEqual({
      id: '1',
      ...tsukuyomi
    });
  });
});
