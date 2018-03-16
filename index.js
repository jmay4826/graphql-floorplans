const express = require("express");
const bodyParser = require("body-parser");
const { graphiqlExpress } = require("apollo-server-express");
const graphQLRouter = require("./graphQLRouter");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/graphql", graphQLRouter);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(3000, () => console.log("hey"));
