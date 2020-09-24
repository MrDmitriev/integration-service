'use strict';
const { Router } = require('express');
const { convertBodyByTemplate, getDateByISO8601 } = require('../../utils/conversions');
const { partnerToTigerConversionTemplate } = require('../../conversionMaps/conversionToTigerTemplate');
const axiosTiger = require('../../service/api/axiosTiger');
const axiosPartner = require('../../service/api/axiosPartner');
const partnerOrderSchema = require('../../schemas/partnerOrderSchema');
const partnerOrderValidationMW = require('../../middleware/validation/partnerOrderValidationMW');

const ordersRouter = new Router();

ordersRouter.post('/', partnerOrderValidationMW(partnerOrderSchema), async (req, res) => {
	// validate body
	// validate auth token from partner API
	// save it to DB with/without correct flag
	const convertedbody = convertBodyByTemplate(req.body, partnerToTigerConversionTemplate);
	const body = {
		...convertedbody,
		"InvoiceSendLater": false,
		"Issued": getDateByISO8601(),
		"OrderType": "standard",
	};

	const checkOrderStatus = async (orderId) => {
		try {
			const response = await axiosTiger.get(`/orders/${orderId}/state`);
			const status = response.data['State'];
			console.log('response', response.data);
			if (status !== 'Finished') {
				return setTimeout(() => checkOrderStatus(orderId), 5000);
			} else {
				console.log(`Finished!!!!`);
				const body = { "state": status };
				const response = await axiosPartner.patch(`/orders/${orderId}`, body);
				console.log(`Finished, response`, response);
			}
		} catch (err) {
			console.log('checkorderStatus Error', err);
		}
	}

	try {
		const orderId = body["OrderID"];
		await axiosTiger.post('/orders', body);
		checkOrderStatus(orderId);
		console.log('Success in request Tiger');
	} catch (err) {
		console.log('Error in request Tiger', err);
	}

	res.status(200).json(body);
});

module.exports = ordersRouter;