const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");
const { mocks } = require("./mocks");
const { typeDefs } = require("../schema/typedefs");
const { resolvers } = require('../schema/resolvers');
const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

module.exports = { schema };
