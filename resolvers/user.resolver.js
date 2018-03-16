const getUser = (rootValue, args, context, info) => {
  return context.user;
};

module.exports = {
  Query: {
    getUser
  }
};
