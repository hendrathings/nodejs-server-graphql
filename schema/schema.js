const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./typedefs");
const { resolvers } = require("./resolvers");
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { schema };
