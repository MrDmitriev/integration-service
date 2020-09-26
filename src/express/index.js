'use strict'
const express = require('express');
const mongoose = require('mongoose');
const {getLogger} = require('../utils/logger');
const ordersRouter = require('./routes/orders');
const {DEFAULT_PORT} = require('../constants/constants');

const PORT = process.env.PORT || DEFAULT_PORT;
const app = express();
const logger = getLogger();

require(`dotenv`).config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.end(`<h1>Hello page. PORT: ${PORT}</h1>`));

const start = async () => {
	try {
		await mongoose.connect(process.env.mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		app.listen(PORT, () => {
			logger.info(`Server started successfully on: PORT:${PORT}`);
		})
	} catch (err) {
		logger.error('Starting server failed', err);
	}
};

start();