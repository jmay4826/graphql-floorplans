//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { graphiqlExpress } = require("apollo-server-express");
const graphQLRouter = require("./graphQLRouter");
const massive = require("massive");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { apolloUploadExpress } = require("apollo-upload-server");

const app = express();

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "@nyth!ng y0u w@nT",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => {
  done(null, {
    username: user.username.toLowerCase(),
    type: user.type,
    userid: user.id
  });
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(bodyParser.json());
app.use(apolloUploadExpress());

passport.use(
  new LocalStrategy(function(username, password, done) {
    const db = app.get("db");
    db.users.findOne({ username: username.toLowerCase() }).then(function(user) {
      if (!user) {
        return done(null, false);
      }
      const authenticated = bcrypt.compareSync(password, user.password);

      if (!authenticated) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.use(
  "/graphql",
  (req, res, next) => {
    return next();
  },
  graphQLRouter
);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));

app.post("/auth/login", passport.authenticate("local"), (req, res) =>
  res.send(req.user)
);

app.get("/auth/me", (req, res) => res.json(req.user));

app.listen(5000, () => console.log("Listening on 5000"));
