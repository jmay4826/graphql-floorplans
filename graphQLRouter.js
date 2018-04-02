const { makeExecutableSchema } = require("graphql-tools");
const { graphqlExpress } = require("apollo-server-express");
const fs = require("fs-extra");
const { merge } = require("lodash");

const userResolver = require("./resolvers/user.resolver");
const locationResolver = require("./resolvers/location.resolver");

let locationSchema = fs.readFileSync("./schemas/location.graphql", "utf8");
let commentSchema = fs.readFileSync("./schemas/comment.graphql", "utf8");
let userSchema = fs.readFileSync("./schemas/user.graphql", "utf8");
let tagSchema = fs.readFileSync("./schemas/tag.graphql", "utf8");

const baseSchema = `
schema {
    query: Query
    mutation: Mutation
}
`;

const resolvers = merge(userResolver, locationResolver);
const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userSchema, locationSchema, commentSchema, tagSchema],
  resolvers: merge(userResolver, locationResolver)
});

module.exports = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: { id: 8, username: "demoadmin", type: "admin" }
  }
}));
