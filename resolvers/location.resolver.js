const getLocation = async (rootValue, args, context, info) => {
  return await context.req.app.get("db").locations.findOne({ id: args.id });
};

const getComments = async (rootValue, args, context, info) => {
  return await context.req.app
    .get("db")
    .comments.find({ location: rootValue.id });
};

const getUsers = async (rootValue, args, context, info) => {
  const users = await context.req.app
    .get("db")
    .location_permissions.find({ location: rootValue.id });

  return users;
};

const getUsername = () => {
  console.log("getusername in location");
  return "jonathan";
};
const getRealName = () => {
  console.log("get real name in location");
  return "may";
};
const getReplies = async ({ id }, args, context) => {
  return await context.req.app.get("db").comments.find({ reply_id: id });
};

module.exports = {
  Query: {
    getLocation
  },
  Location: {
    comments: getComments
  },
  Comment: {
    replies: getReplies
  }
};
