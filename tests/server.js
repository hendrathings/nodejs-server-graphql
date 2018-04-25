const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const { schema } = require("./schema");

const GRAPHQL_PORT = 4001;

const graphQLServer = express();

graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

module.exports = { graphQLServer };
