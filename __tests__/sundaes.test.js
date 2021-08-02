import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Sundae from '../lib/models/Sundae.js';

describe('sundae routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a sundae via POST', async () => {
    const sundae = { flavor: 'vanilla', scoops: 3, toppings: 'sprinkles', additionalToppings: 'none' };
    const res = await request(app)
      .post('/api/v1/sundaes')
      .send(sundae);

    expect(res.body).toEqual({
      id: '1',
      ...sundae
    });
  });

  it('gets a sundae order by id via GET', async () => {
    const sundae = await Sundae.insert({
      flavor: 'chocolate and strawberry',
      scoops: 2,
      toppings: 'hot fudge',
      additionalToppings: 'chocolate chips',
    });

    const res = await request(app).get(`/api/v1/bunnies/${sundae.id}`);

    expect(res.body).toEqual(sundae);
  });
});
