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

    const res = await request(app).get(`/api/v1/sundaes/${sundae.id}`);

    expect(res.body).toEqual(sundae);
  });

  it('gets all sundae orders via GET', async () => {
    const sundaeOne = await Sundae.insert({
      flavor: 'chocolate and strawberry',
      scoops: 2,
      toppings: 'hot fudge',
      additionalToppings: 'chocolate chips',
    });

    const sundaeTwo = await Sundae.insert({
      flavor: 'matcha and ube',
      scoops: 3,
      toppings: 'mochi',
      additionalToppings: 'boba',
    });

    const sundaeThree = await Sundae.insert({
      flavor: 'cookies and cream, cookie dough',
      scoops: 2,
      toppings: 'banana',
      additionalToppings: 'whipped cream',
    });

    const res = await request(app)
      .get('/api/v1/sundaes');

    expect(res.body).toEqual([sundaeOne, sundaeTwo, sundaeThree]);
  });

  it('updates a sundae order by id via PUT', async () => {
    const sundae = await Sundae.insert({
      flavor: 'chocolate and strawberry',
      scoops: 2,
      toppings: 'hot fudge',
      additionalToppings: 'chocolate chips',
    });

    const res = await request(app)
      .put(`/api/v1/sundaes/${sundae.id}`)
      .send({ scoops: 3 });
    expect(res.body).toEqual({ ...sundae, scoops: 3 });
  });
});
