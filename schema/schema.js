const { makeExecutableSchema } = require("graphql-tools");
// The GraphQL schema in string form
const { typeDefs } = require("./typedefs");
// The resolvers
const { resolvers } = require("./resolvers");
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };
