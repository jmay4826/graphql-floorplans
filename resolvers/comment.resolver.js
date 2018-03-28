const getAuthor = async (rootValue, args, context, info) => {
  console.log("get the authors real name");
  return "jonathan";

  return await context.req.app
    .get("db")
    .users.findOne({ username: rootValue.author }, { fields: ["name"] });
};

const getUsername = rootValue => {
  console.log(rootValue);
  return rootValue;
};

const getComments = async (rootValue, args, context, info) => {
  console.log(rootValue);
  return await context.req.app
    .get("db")
    .comments.find({ location: rootValue.id });
};

module.exports = {
  Comment: getComments
};
