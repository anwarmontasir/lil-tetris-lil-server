const express = require('express');
const app = express();

const morgan = require('morgan');
const redirectHttp = require('./redirect-http')();
const checkDb = require('./check-connection')();
const errorHandler = require('./error-handler')();
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));

if(process.env.NODE_ENV === 'production'){
    app.use(redirectHttp);
}

app.use(express.static('./public'));

const auth = require('./routes/auth');
const me = require('./routes/me');
// const scores = require('./routes/scores');

if(process.env.NODE_ENV !== 'production') {
    app.use(checkDb);
}

app.use('/api/auth', auth);
app.use('/api/me', ensureAuth, me);
// app.use('/api/scores', ensureAuth, scores);

app.use(errorHandler);

module.exports = app;