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

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./client/dist'));
app.use(express.static('./server/static'));

const localLoginStrategy = require('./passport/local-login');
passport.use('local-login', localLoginStrategy);

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'server/static', 'index.html'));
});

app.listen(PORT, function() {
	console.log('App listening on port', PORT);
});