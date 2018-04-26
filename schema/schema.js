const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");
const schema = makeExecutableSchema({ typeDefs, resolvers });

addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

module.exports = { schema };
