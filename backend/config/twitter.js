const TwitterClient = require('twitter');
const keys = require('./keys');

module.exports = (req, res, next) => {
  req.twitterClient = new TwitterClient({
    consumer_key: keys.consumerKey,
    consumer_secret: keys.consumerSecret,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret,
  });
  next();
};
