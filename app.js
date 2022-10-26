const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const errController = require('./Controllers/ErrorController');

const app = express();
app.use(express.json());
app.use(morgan('common'));

app.get('/', (req, res) => {
	res.send('Welcome to Cracked Ink');
});

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`Can't find ${req.originalUrl} on this server!!`,
			404,
		),
	);
});

app.use(errController);

module.exports = app;
