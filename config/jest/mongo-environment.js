const NodeEnvironment = require('jest-environment-node');
const { MongoClient } = require("mongodb");

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');

    this.global.__MONGO_URI__ = await global.__MONGOD__.getConnectionString();
    this.global.__MONGO_DB_NAME__ = global.__MONGO_DB_NAME__;
    this.global.__CONNECTION__ = await MongoClient.connect(this.global.__MONGO_URI__);
    this.global.__DB__ = await this.global.__CONNECTION__.db(this.global.__MONGO_DB_NAME__);

    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');
    // await this.global.__CONNECTION__.close();
    // await this.global.__DB__.close();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
