'use strict';
const { Router } = require('express');
const { convertBodyByTemplate, getDateByISO8601 } = require('../../utils/conversions');
const { partnerToTigerConversionTemplate } = require('../../conversionMaps/conversionToTigerTemplate');
const axiosTiger = require('../../service/api/axiosTiger');

const ordersRouter = new Router();

ordersRouter.post('/', async (req, res) => {
	// validate body
	// save it to DB with/without correct flag
	const convertedbody = convertBodyByTemplate(req.body, partnerToTigerConversionTemplate);
	// add to body missing keys&values including issued time
	const filledBody = {
		...convertedbody,
		"InvoiceSendLater": false,
		"Issued": getDateByISO8601(),
		"OrderType": "standard",
	};

	// send new request to Tiger with auth key in header
	try {

	}
	console.log('response', response);
	// add recursive check for status: get /order_id/status,
	// when get from Tiger status: finished, send PATCH: {status: finished}
	res.status(200).json(filledBody);
});

module.exports = ordersRouter;