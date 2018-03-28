require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { graphiqlExpress } = require("apollo-server-express");
const graphQLRouter = require("./graphQLRouter");
const massive = require("massive");
const cors = require("cors");

const app = express();
massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/graphql",
  (req, res, next) => {
    // console.log(req.body);
    return next();
  },
  graphQLRouter
);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(5000, () => console.log("Listening on 5000"));
