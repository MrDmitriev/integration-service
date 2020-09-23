'use strict';
const {Router} = require('express');

const {convertBodyByTemplate, getDateByISO8601} = require('../../utils/utils');
const {partnerToTigerConversionTemplate} = require('../../conversionMaps/conversionToTigerAPI');
const {partnerRequest} = require('../../mock');

const ordersRouter = new Router();

ordersRouter.post('/', async (req, res) => {
		// validate body
		// save it to DB with/without correct flag
		console.log('ordersRouter post');
		const convertedbody = await convertBodyByTemplate(partnerRequest, partnerToTigerConversionTemplate);
		// add to body missing keys&values including issued time
		const filledBody = {
			...convertedbody,
			"InvoiceSendLater": false,
			"Issued": getDateByISO8601(),
			"OrderType": "standard",
		};
		// send new request to Tiger with auth key in header
		// add recursive check for status: get /order_id/status,
		// when get from Tiger status: finished, send PATCH: {status: finished}
		res.status(200).json({message: 'its ok'});
});

module.exports = ordersRouter;