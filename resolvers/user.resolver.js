const getUser = async (rootValue, args, context, info) => {
  console.log("get user");
  return await context.req.app
    .get("db")
    .users.findOne({}, { fields: ["username", "name", "type"] });
};

const locations = async ({ username }, args, context, info) => {
  try {
    return await context.req.app.get("db").getLocationsForUser({ username });
  } catch (e) {
    return e;
  }
};

module.exports = {
  Query: {
    getUser
  },
  User: {
    locations
  }
};
