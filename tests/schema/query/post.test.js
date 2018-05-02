const { ObjectID } = require("mongodb");
require("../../../db/mongoose.test.config").moongooseConnect();
const postQuerySchema = require("../../../schema/query/post");
const {Post} = require("../../../models/Post");
const casual = require("casual");

describe("Schema Query Post", () => {
  it("should function post(root, args) return single post object", async () => {

    // const db = await getDb();
    const id = new ObjectID();
    const mockPost = {
      _id: id,
      title: casual.title,
      content: casual.text,
      createdAt: new Date(),
      modifiedAt: new Date(),
      author: casual.name
    };
    // const post = db.collection("post");
    // await post.insertOne(mockPost);
    // const result = await postQuerySchema.post({}, { id: "5ae9564459a14a49706df20a" });
    const result = await Post.findById("5ae9564459a14a49706df20a");
    await expect(result).toEqual(mockPost);
  });
});
