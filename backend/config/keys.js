// ADD YOUR OWN KEYS

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    consumerKey: process.env.consumerKey,
    consumerSecret: process.env.consumerSecret,
    callbackURL: process.env.callbackURL,
    sessionSecret: process.env.sessionSecret,
  };
} else {
  module.exports = {
    consumerKey: 'ADD YOUR CONSUMER KEY',
    consumerSecret: 'ADD YOUR SECRET KEY',
    callbackURL: 'ADD YOUR CALLBACK URL',
    sessionSecret: 'YOUR SESSION SECRET KEY',
  };
}
