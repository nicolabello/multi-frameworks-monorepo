import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from './app.js';
import { FeatureModel } from './models/feature-model.js';

let mongo: MongoMemoryServer;
const app = createApp();

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await FeatureModel.deleteMany({});
});

const darkMode = { key: 'darkMode', description: 'Dark theme', type: 'boolean', value: true };

describe('REST /features', () => {
  it('creates and lists features', async () => {
    const created = await request(app).post('/features').send(darkMode).expect(201);
    expect(created.body).toMatchObject(darkMode);
    expect(created.body._id).toBeDefined();

    const list = await request(app).get('/features').expect(200);
    expect(list.body).toHaveLength(1);
  });

  it('filters by query string', async () => {
    await request(app).post('/features').send(darkMode).expect(201);
    await request(app).post('/features').send({ key: 'limit', type: 'number', value: 3 }).expect(201);

    const list = await request(app).get('/features?type=number').expect(200);
    expect(list.body.map((f: { key: string }) => f.key)).toEqual(['limit']);
  });

  it('rejects invalid features', async () => {
    const res = await request(app)
      .post('/features')
      .send({ key: '', type: 'number', value: 'x' })
      .expect(400);
    expect(res.body.errors).toEqual({ key: 'This is required', value: 'Does not match the type' });
  });

  it('gets and updates a feature by id', async () => {
    const { body: created } = await request(app).post('/features').send(darkMode);

    await request(app).get(`/features/${created._id}`).expect(200);
    const updated = await request(app)
      .put(`/features/${created._id}`)
      .send({ ...darkMode, value: false })
      .expect(200);
    expect(updated.body.value).toBe(false);
  });

  it('answers 400, not 500, to malformed JSON', async () => {
    await request(app).post('/features').set('content-type', 'application/json').send('{"key":').expect(400);
  });

  it('returns 404 for unknown or malformed ids', async () => {
    await request(app).get(`/features/${new mongoose.Types.ObjectId()}`).expect(404);
    await request(app).get('/features/not-an-id').expect(404);
    await request(app).put('/features/not-an-id').send(darkMode).expect(404);
  });
});

describe('GraphQL /graphql/features', () => {
  it('queries features', async () => {
    await request(app).post('/features').send(darkMode).expect(201);

    const res = await request(app)
      .post('/graphql/features')
      .send({ query: '{ getAll { key type value } }' })
      .expect(200);
    expect(res.body).toEqual({ data: { getAll: [{ key: 'darkMode', type: 'boolean', value: true }] } });
  });

  it('applies the shared validation rules to mutations', async () => {
    // A valid string feature (empty string included) is accepted…
    await request(app)
      .post('/graphql/features')
      .send({ query: 'mutation { add(record: { key: "msg", type: "string", value: "" }) { recordId } }' })
      .expect(200);
    await FeatureModel.deleteMany({});

    // …a number feature with a string value isn't
    const res = await request(app)
      .post('/graphql/features')
      .send({
        query: 'mutation { add(record: { key: "limit", type: "number", value: "abc" }) { recordId } }',
      })
      .expect(200);

    expect(res.body.errors[0].message).toContain('Does not match the type');
    expect(await FeatureModel.countDocuments()).toBe(0);
  });
});
