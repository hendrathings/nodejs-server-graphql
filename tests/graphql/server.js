const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { schema } = require("../schema/schema");
const GRAPHQL_PORT = 4001;
const graphQLServer = express();

graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

const serverListening = graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);

module.exports = { graphQLServer, serverListening };
