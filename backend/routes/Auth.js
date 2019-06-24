const routes = require('express').Router();
const passport = require('passport');
const twitterMiddleware = require('../config/twitter');

routes.get('/auth', passport.authenticate('twitter'));

routes.get('/authcallback', passport.authenticate('twitter', { successRedirect: '/' }));

routes.get('/checkLogin', (req, res) => {
  if (req.user) {
    return res.status(200).json({ user: req.user.userProfile });
  }
  return res.status(200).json({ user: null });
});

routes.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({ msg: 'alright' });
});

routes.get('/tweets', twitterMiddleware, async (req, res) => {
  req.twitterClient.get('statuses/user_timeline', (err, tweets, response) => {
    const tweetsF = tweets.map(t => ({
      text: t.text,
      user: t.user.name,
    }));
    return res.status(200).json({ message: tweetsF });
  });
});

routes.post('/createTweet', twitterMiddleware, async (req, res) =>
  // if(req.body.textToTweet) {
  //   req.twitterClient.post('statuses/update', {status: req.body.textToTweet}, function(err, tweet) {
  //     return res.status(200).json({message: tweet.text});
  //   });
  // }
  res.status(200).json({ message: 'created' }));


module.exports = routes;
