import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Bunny from '../lib/models/Bunny.js';

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


  it('gets a bunny by id via GET', async () => {
    const nesma = await Bunny.insert({
      name: 'nesma',
      mainColor: 'black',
      secondColor: 'none',
      ears: 'long',
    });

    const res = await request(app).get(`/api/v1/bunnies/${nesma.id}`);

    expect(res.body).toEqual(nesma);
  });


  it('gets all bunnies via GET', async () => {
    const nesma = await Bunny.insert({
      name: 'nesma',
      mainColor: 'black',
      secondColor: 'none',
      ears: 'long',
    });

    const soma = await Bunny.insert({
      name: 'soma',
      mainColor: 'black',
      secondColor: 'none',
      ears: 'medium',
    });

    const freidrik = await Bunny.insert({
      name: 'freidrik',
      mainColor: 'white',
      secondColor: 'black',
      ears: 'long',
    });

    const res = await request(app).get('/api/v1/bunnies');

    expect(res.body).toEqual([nesma, soma, freidrik]);
  });
});
