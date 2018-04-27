const request = require("supertest");
const { graphQLServer, serverListening } = require("../server");
const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const casual = require("casual");

let connection;
let db;
const mongooseOpts = {
  // options for mongoose 4.11.3 and above
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
};

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__);
  db = await connection.db(global.__MONGO_DB_NAME__);
  mongoose.Promise = global.Promise;
  mongoose.connect(global.__MONGO_URI__, mongooseOpts);
  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(global.__MONGO_URI__, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${global.__MONGO_URI__}`);
  });
});

afterAll(async () => {
  await connection.close();
  await db.close();
  serverListening.close();
});

describe("Post", () => {
  describe("Query", () => {
    it("should query post(id) { ... } return single post", async done => {
      const id = new ObjectID();
      const post = db.collection("post");

      const mockPost = {
        _id: id,
        title: casual.title,
        content: casual.text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: casual.name
      };
      await post.insertOne(mockPost);

      request(graphQLServer)
        .post("/graphql")
        .set("Accept", "application/json")
        .send({
          query:
            "query getPost($id: String!){ post(id: $id) {id, title, content, createdAt, modifiedAt, author } }",
          variables: { id: id.toHexString() }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.post).toEqual(mockPost);
        })
        .end(done);
    });

    it("should query posts { ... } return array post", async done => {
      const id = new ObjectID();
      const post = db.collection("post");

      const mockPost = {
        _id: id,
        title: casual.title,
        content: casual.text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: casual.name
      };
      await post.insertOne(mockPost);

      request(graphQLServer)
        .post("/graphql")
        .set("Accept", "application/json")
        .send({
          query: "{posts{id, title, content, createdAt, modifiedAt, author }}"
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.posts).toContainEqual(mockPost);
        })
        .end(done);
    });
  });

  describe("Mutation", () => {
    it("should mutation createPost(input) { ... } create new post", done => {
      const mockPost = {
        title: casual.title,
        content: casual.text,
        author: casual.name
      };

      request(graphQLServer)
        .post("/graphql")
        .set("Accept", "application/json")
        .send({
          query:
            "mutation createPost($input: PostInput!) { createPost(input: $input) { title, content, author } }",
          variables: {
            input: mockPost
          }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.createPost).toEqual(mockPost);
        })
        .end(done);
    });
    it("should mutation updatePost(id, input) { ... } update existing post", async done => {
      const id = new ObjectID();
      const post = db.collection("post");

      const mockPost = {
        _id: id,
        title: casual.title,
        content: casual.text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: casual.name
      };
      await post.insertOne(mockPost);

      const mockUpdatedPost = {
        title: "new title",
        content: "new content",
        author: "new author"
      };

      request(graphQLServer)
        .post("/graphql")
        .set("Accept", "application/json")
        .send({
          query:
            "mutation updatePost($id: String!, $input: PostUpdateInput!){ updatePost(id: $id, input: $input) {id, title, content, author } }",
          variables: {
            id: id.toHexString(),
            input: mockUpdatedPost
          }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.updatePost).toEqual(mockUpdatedPost);
        })
        .end(done);
    });
    it("should mutation deletePost(id) { ... } delete existing post", async done => {
      const id = new ObjectID();
      const post = db.collection("post");

      const mockPost = {
        _id: id,
        title: casual.title,
        content: casual.text,
        createdAt: new Date(),
        modifiedAt: new Date(),
        author: casual.name
      };
      await post.insertOne(mockPost);

      request(graphQLServer)
        .post("/graphql")
        .set("Accept", "application/json")
        .send({
          query:
            "mutation deletePost($id: String!){ deletePost(id: $id) {id, title, content, createdAt, modifiedAt, author } }",
          variables: { id: id.toHexString() }
        })
        .expect(200)
        .expect(response => {
          expect(response.body.data.deletePost).toEqual(mockPost);
        })
        .end(done);
    });
  });
});
