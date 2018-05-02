const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
const mongooseOpts = {
  // options for mongoose 4.11.3 and above
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
};
const mongoURI = "mongodb://localhost:27017/";
const mongoDBName = "TestBlogApp";

// const getDb = async () => {
//   const connection = await MongoClient.connect(mongoURI);
//   return await connection.db(mongoDBName);
// };

const moongooseConnect = async () => {
  await mongoose.connect(mongoURI, mongooseOpts);
  mongoose.connection.db = mongoDBName;
  mongoose.connection.on("error", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoURI, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoURI}`);
  });
};

// module.exports = { getDb };
module.exports = { moongooseConnect };
