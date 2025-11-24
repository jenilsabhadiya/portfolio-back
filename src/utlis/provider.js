const passport = require("passport");
const Users = require("../model/users.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googleProvider = async () => {
  await passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/api/v1/users/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const user = await Users.findOne({ googleId: profile.id });
          // console.log(user);

          if (!user) {
            const userData = await Users.create({
              name: profile.name.givenName,
              email: profile.emails[0].value,
              role: "user",
              isVarifind: true,
            });

            // console.log(userData);
            return cb(null, userData);
          }

          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );

  try {
    passport.serializeUser(function (user, done) {
      done(null, user._id);
    });

    passport.deserializeUser(function (_id, done) {
      const user = Users.findById(_id);
      done(null, user);

      // User.findById(id, function (error, user) {
      //   done(error, user);
      // });
    });
  } catch (error) {
    done(error, null);
  }
};

const fackbookProvider = async () => {
  await passport.use(
    new FacebookStrategy(
      {
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8000/api/v1/users/facebook/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        // const user = await Users.findOne({ facebookId: profile.id });
        // console.log(user);

        // if (!user) {
        //   const userData = await Users.create({
        //     name: profile.name.givenName,
        //     email: profile.emails[0].value,
        //     role: "user",
        //     isVarifind: true,
        //   });

        //   console.log(userData);
        // }
      }
    )
  );
};

module.exports = { googleProvider, fackbookProvider };
