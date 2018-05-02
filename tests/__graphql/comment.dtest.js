const request = require('supertest');
const { graphQLServer } = require('../server');
const { MongoClient } = require('mongodb');

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__);
  db = await connection.db(global.__MONGO_DB_NAME__);
});

afterAll(async () => {
  await connection.close();
  await db.close();
});

describe('Comment', () => {
  it('should tobe 100', () => {
    expect(10 * 10).toBe(100);
  });
});
