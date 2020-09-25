'use strict'
const express = require('express');
const mongoose = require('mongoose');
const {getLogger} = require('../utils/logger');
const ordersRouter = require('./routes/orders');

const PORT = process.env.PORT || 8080;
const app = express();
const logger = getLogger();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.end(`<h1>Hello page. PORT: ${PORT}</h1>`));

const start = async () => {
	try {
		await mongoose.connect('mongodb+srv://mrdmitriev:extreme3dproA@cluster0.v8gxo.azure.mongodb.net/app?retryWrites=true&w=majority', {
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