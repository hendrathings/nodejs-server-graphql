const request = require('supertest');
const { graphQLServer } = require('../server');
const { MongoClient } = require('mongodb');

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__);
  db = await connection.db(global.__MONGO_DB_NAME__);
});

afterAll(async () => {
  await connection.close();
  await db.close();
});

describe('Post', () => {
  it('test js', async done => {
    const users = db.collection('users');

    const mockUser = { _id: 'some-user-id', name: 'John' };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: 'some-user-id' });
    expect(insertedUser).toEqual(mockUser);
  });

  describe('Query', () => {
    it('should query post(id) { ... } return single post', done => {
      request(graphQLServer)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query:
            'query getPost($id: String!){ post(id: $id) {id, title, content, createdAt, modifiedAt, author } }',
          variables: { id: '5ae001f1aa2c9602700de0d1' }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.post).toBeNull();
        })
        .end(done);
    });

    it('should query posts { ... } return array post', done => {
      request(graphQLServer)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query: '{posts{id, title, content, createdAt, modifiedAt, author }}'
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.posts).toHaveLength(0);
        })
        .end(done);
    });
  });

  describe('Mutation', () => {
    it('should mutation createPost(input) { ... } create new post', done => {
      request(graphQLServer)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query:
            'mutation createPost($input: PostInput!) { createPost(input: $input) { id, title, content, createdAt, modifiedAt, author } }',
          variables: {
            input: {
              title: 'hello world',
              content: 'hello there',
              author: 'hendra'
            }
          }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.createPost).toBeNull();
        })
        .end(done);
    });
    it('should mutation updatePost(id, input) { ... } update existing post', done => {
      request(graphQLServer)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query:
            'mutation updatePost($id: String!, $input: PostUpdateInput!){ updatePost(id: $id, input: $input) {id, title, content, author } }',
          variables: {
            id: '5adff09eb41347345cb6132c',
            input: {
              title: 'from zero to advanced',
              content: 'this is content has updated',
              author: 'hendra things'
            }
          }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.updatePost).toBeNull();
        })
        .end(done);
    });
    it('should mutation deletePost(id) { ... } delete existing post', done => {
      request(graphQLServer)
        .post('/graphql')
        .set('Accept', 'application/json')
        .send({
          query:
            'mutation deletePost($id: String!){ deletePost(id: $id) {id, title, content, createdAt, modifiedAt, author } }',
          variables: { id: '5adff09eb41347345cb6132c' }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.deletePost).not.toBeNull();
        })
        .end(done);
    });
  });
});
