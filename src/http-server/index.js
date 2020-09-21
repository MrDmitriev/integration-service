'use strict'
const express = require('express');
const app = express();

const ordersRouter = require('./routes/orders');
const PORT = process.env.PORT || 8080;

app.use('/api/orders', ordersRouter);

app.get('/', (req, res) => {
	res.end('<h1>Hello page</h1>');
});

app.get('/about', (req, res) => {
	res.end('<h1>About page</h1>');
});

app.listen(PORT, () => {
	console.log(`Server started successfully`);
})