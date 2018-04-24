const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { mongoose } = require("./db/mongoose");
const cors = require("cors");
// The GraphQL schema in string form
const { typeDefs } = require("./schema/typedefs");
// The resolvers
const { resolvers } = require("./schema/resolvers");
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

app.use(cors());
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.listen(4000, () => console.log("Now browse to localhost:4000/graphiql"));
