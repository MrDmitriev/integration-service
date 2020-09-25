'use strict'
const express = require('express');
const mongoose = require('mongoose');

const ordersRouter = require('./routes/orders');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => res.end(`<h1>Hello page. PORT: ${PORT}</h1>`));

const start = async () => {
	try {
		await mongoose.connect(process.env.mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		app.listen(PORT, () => {
			console.log(`Server started successfully`);
		})
	} catch (err) {
		console.log('Starting server failed', err.message);
	}
};

start();