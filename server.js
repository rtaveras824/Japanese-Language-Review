const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const path = require('path');

const PORT = process.env.PORT || 8000;

mongoUrl = 'mongodb://localhost/japanese-language-review';

mongoose.connect(mongoUrl);
mongoose.connection.on('error', (err) => {
	console.log('Mongoose error', err);
});

// Import mongoose models
require('./models/List');
require('./models/Card');

app.use(express.static('./client/dist'));
app.use(express.static('./server/static'));

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'server/static', 'index.html'));
});

app.listen(PORT, function() {
	console.log('App listeneing on port', PORT);
});