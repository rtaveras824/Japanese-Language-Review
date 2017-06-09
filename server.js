const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

mongoUrl = 'mongodb://localhost/japanese-language-review';

mongoose.connect(mongoUrl);
mongoose.connection.on('error', (err) => {
	console.log('Mongoose error', err);
});

// Import mongoose models
require('./models/List');
require('./models/Card');

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.listen(PORT, function() {
	console.log('App listeneing on port', PORT);
});