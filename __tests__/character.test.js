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
    const lia = { name: 'Amelia Silverwind', jobClass: 'witch', race: 'changeling', gender: 'female' };
    const res = await request(app)
      .post('/api/v1/characters')
      .send(lia);
  
    expect(res.body).toEqual({
      id: '1',
      ...lia
    });
  });

  it('gets a character by id via GET', async () => {
    const lia = await Character.insert({
      name: 'Amelia Silverwind', 
      jobClass: 'witch', 
      race: 'changeling', 
      gender: 'female'
    });

    const res = await request(app).get(`/api/v1/characters/${lia.id}`);

    expect(res.body).toEqual(lia);
  });

  it('gets all characters via GET', async () => {
    const lia = await Character.insert({
      name: 'Amelia Silverwind', 
      jobClass: 'witch', 
      race: 'changeling', 
      gender: 'female'
    });

    const kyv = await Character.insert({
      name: 'Kyvernys Gracewind', 
      jobClass: 'champion/monk', 
      race: 'human', 
      gender: 'male'
    });

    const wesley = await Character.insert({
      name: 'Wesley Owens', 
      jobClass: 'magus', 
      race: 'human', 
      gender: 'male'
    });

    const yun = await Character.insert({
      name: 'Volyun Junaiper', 
      jobClass: 'druid', 
      race: 'elf', 
      gender: 'male'
    });

    const res = await request(app)
      .get('/api/v1/characters');

    expect(res.body).toEqual([lia, kyv, wesley, yun]);
  });

  it('updates a character by id via PUT', async () => {
    const wesley = await Character.insert({
      name: 'Wesley Owens', 
      jobClass: 'sorcerer', 
      race: 'human', 
      gender: 'male'
    });

    const res = await request(app)
      .put(`/api/v1/characters/${wesley.id}`)
      .send({ jobClass: 'magus' });

    expect(res.body).toEqual({ ...wesley, jobClass: 'magus' });
  });

  it('deletes an existing character by id via DELETE', async () => {
    const voi = await Character.insert({
      name: 'Voithys',
      jobClass: 'monk',
      race: 'aasimar',
      gender: 'male',
    });
  
    const res = await request(app)
      .delete(`/api/v1/characters/${voi.id}`);
  
    expect(res.body).toEqual({ 
      message: `${voi.name} has left the party`
    });
  });
});

