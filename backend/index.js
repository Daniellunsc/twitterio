const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const passportConfig = require('./config/passport');

const app = express();
const keys = require('./config/keys');

app.use(morgan('dev'));

app.use(cors({
  origin: 'http://localhost:4200', // allow to server to accept request from different origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow session cookie from browser to pass through
}));

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.sessionSecret],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

app.use(passportConfig.initialize());
app.use(passportConfig.session());

app.use(bodyParser.json({ type: 'application/json' }));

app.use('/api', require('./routes/Auth'));

app.use(express.static(`${__dirname}/client/dist/frontend`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/dist/frontend/index.html`));
});


app.listen(8000, () => {
  console.log('Backend running');
});

module.exports = app;
