const { makeExecutableSchema } = require("graphql-tools");
const { graphqlExpress } = require("apollo-server-express");
const fs = require("fs-extra");

const userResolver = require("./resolvers/user.resolver");

let locationSchema = fs.readFileSync("./schemas/location.graphql", "utf8");
let commentSchema = fs.readFileSync("./schemas/comment.graphql", "utf8");
let userSchema = fs.readFileSync("./schemas/user.graphql", "utf8");
let tagSchema = fs.readFileSync("./schemas/tag.graphql", "utf8");

const baseSchema = `
schema {
    query: Query
}
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userSchema, locationSchema, commentSchema, tagSchema],
  resolvers: userResolver
});

module.exports = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: { id: 8, username: "demoadmin", type: "admin" }
  }
}));
