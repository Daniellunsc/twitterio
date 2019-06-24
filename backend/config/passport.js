const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.consumerKey,
      consumerSecret: keys.consumerSecret,
      callbackURL: keys.callbackURL,
    }, ((token, tokenSecret, profile, cb) => cb(null, {
      token,
      tokenSecret,
      userProfile: { userName: profile._json.name, userScreen: profile._json.screen_name },
    })),
  ),
);

module.exports = passport;
