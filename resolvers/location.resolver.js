const { GraphQLUpload } = require("apollo-upload-server");
require("dotenv").config();
const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
} = process.env;

const getLocation = async (rootValue, args, context, info) => {
  return await context.req.app.get("db").locations.findOne({ id: args.id });
};

const getComments = async (rootValue, args, context, info) => {
  const comments = await context.req.app
    .get("db")
    .comments.find(
      { location: rootValue.id },
      { order: [{ field: "created_at", direction: "desc" }] }
    );

  const incomplete = comments.filter(({ complete }) => !complete);
  const completed = comments.filter(({ complete }) => complete);
  return { incomplete, completed };
};

const getUsers = async (rootValue, args, context, info) => {
  const users = await context.req.app
    .get("db")
    .location_permissions.find({ location: rootValue.id });

  return users;
};

const getReplies = async ({ id }, args, context) => {
  return await context.req.app.get("db").comments.find({ reply_id: id });
};

const addComment = async (rootValue, { input }, context) => {
  console.log(input);
  const db = context.req.app.get("db");
  return await db.comments.save(input);
  //.then(() => db.comments.find({ location: input.location }));
};

const deleteComment = async (rootValue, { id }, context) => {
  return (await context.req.app.get("db").comments.destroy({ id }))[0];
};

const completeComment = async (rootValue, { id }, context) => {
  return await context.req.app
    .get("db")
    .comments.update({ id, complete: true });
};

module.exports = {
  Query: {
    getLocation
  },
  Mutation: {
    addComment,
    deleteComment,
    completeComment
  },
  Location: {
    comments: getComments,
    users: getUsers
  },
  Comment: {
    replies: getReplies
  },
  Upload: GraphQLUpload
};
