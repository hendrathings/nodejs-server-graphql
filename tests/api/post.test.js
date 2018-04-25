const request = require("supertest");
const { graphQLServer } = require("../server");

describe("Post", () => {
  it("should return single post", (done) => {
    request(graphQLServer)
      .post("/graphql")
      .set('Accept', 'application/json')
      .send({
        query:
          "query getPost($id: String!){ post(id: $id) {id, title, content, createdAt, modifiedAt, author } }",
        variables: { id: "5ae001f1aa2c9602700de0d1" }
      })
      .expect(200)
      .end(done);
  });
});
