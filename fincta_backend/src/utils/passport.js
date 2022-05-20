import googleAuth from "passport-google-oauth";
import userModel from "../models/userModel.js";
import passport from "passport";

const GoogleStrategy = googleAuth.OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
// ?authProvider=google

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "976499836256-c9ojgianurb3k66ji0f65dakr6stcl5f.apps.googleusercontent.com",
      clientSecret: "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",
      // callbackURL: "http://localhost:3001/signin",
      callbackURL: "https://fincta-webapp.herokuapp.com/signin",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const user = await userModel.findOne({
          email: profile.emails[0].value,
          loginType: "google",
        });

        if (user) {
          done(null, user);
        } else {
          const userParams = {
            name: profile.name.givenName + " " + profile.name.familyName,
            email: profile.emails[0].value,
            googleLogin: true,
            googleId: profile.id,
          };
          done(null, userParams);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize =>");
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserialize =>" + user);
  done(null, user);
});
