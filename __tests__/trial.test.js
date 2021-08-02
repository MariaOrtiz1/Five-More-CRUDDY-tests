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

  it('gets a trial by id via GET', async () => {
    const tsukuyomi = await Trial.insert({ name: 'Castrum Fluminis', level: 70, boss: 'Tsukuyomi', expansion: 'Stormblood' });

    const res = await request(app).get(`/api/v1/trials/${tsukuyomi.id}`);

    expect(res.body).toEqual(tsukuyomi);
  });

  it('gets all trials via GET', async () => {
    const titania = await Trial.insert({
      name: 'The Dancing Plague',
      level: 73,
      boss: 'Titania',
      expansion: 'Shadowbringers',
    });

    const innocence = await Trial.insert({
      name: 'The Crown of the Immaculate',
      level: 79,
      boss: 'Innocence',
      expansion: 'Shadowbringers',
    });

    const hades = await Trial.insert({
      name: 'The Dying Grasp',
      level: 80,
      boss: 'Hades',
      expansion: 'Shadowbringers',
    });

    const res = await request(app)
      .get('/api/v1/trials');

    expect(res.body).toEqual([titania, innocence, hades]);
  });

  it('updates a trial by id via PUT', async () => {
    const nidhogg = await Trial.insert({
      name: 'The Final Steps of Faith',
      level: 60,
      boss: 'King Thordan',
      expansion: 'Heavensward',
    });

    const res = await request(app)
      .put(`/api/v1/trials/${nidhogg.id}`)
      .send({ boss: 'Nidhogg' });

    expect(res.body).toEqual({ ...nidhogg, boss: 'Nidhogg' });
  });

  it('deletes an existing trial by id via DELETE', async () => {
    const moogle = await Trial.insert({
      name: 'Thornmarch',
      level: 50,
      boss: 'Good King Moogle Mog XII',
      expansion: 'A realm Reborn',
    });

    const res = await request(app)
      .delete(`/api/v1/trials/${moogle.id}`);

    expect(res.body).toEqual({ 
      message: `${moogle.boss} has been defeated!`
    });
  });
});
