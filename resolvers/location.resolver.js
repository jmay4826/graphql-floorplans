const getLocation = async (rootValue, args, context, info) => {
  return await context.req.app.get("db").locations.findOne({ id: args.id });
};

const getComments = async (rootValue, args, context, info) => {
  return await context.req.app
    .get("db")
    .comments.find(
      { location: rootValue.id },
      { order: [{ field: "created_at", direction: "desc" }] }
    );
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

module.exports = {
  Query: {
    getLocation
  },
  Mutation: {
    addComment
  },
  Location: {
    comments: getComments,
    users: getUsers
  },
  Comment: {
    replies: getReplies
  }
};
