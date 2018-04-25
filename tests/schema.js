const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");
const { mocks } = require("./mocks");
const { typeDefs } = require("../schema/typedefs");
const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

module.exports = { schema };
