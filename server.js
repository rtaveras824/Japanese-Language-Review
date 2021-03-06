const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config.json');

const PORT = process.env.PORT || 8000;

mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', (err) => {
	console.log('Mongoose error', err);
});

// Import mongoose models
require('./models/User');
require('./models/List');
require('./models/Card');
require('./models/UserList');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./client/dist'));
app.use(express.static('./server/static'));

app.use(passport.initialize());

const localLoginStrategy = require('./passport/local-login');
const localSignupStrategy = require('./passport/local-signup');
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

app.use('/api', authCheckMiddleware, apiRoutes);
app.use('/auth', authRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'server/static', 'index.html'));
});

app.listen(PORT, function() {
	console.log('App listening on port', PORT);
});