import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Character from '../lib/models/Character.js';

describe('character routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('creates a character via POST', async () => {
    const lia = { name: 'Amelia Silverwind', class: 'witch', race: 'changeling', gender: 'female' };
    const res = await request(app)
      .post('/api/v1/characters')
      .send(lia);
  
    expect(res.body).toEqual({
      id: '1',
      ...lia
    });
  });
});
