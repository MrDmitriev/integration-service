'use strict';
const { Router } = require('express');
const { convertBodyByTemplate, getDateByISO8601 } = require('../../utils/conversions');
const { partnerToTigerConversionTemplate } = require('../../conversionMaps/conversionToTigerTemplate');
const axiosTiger = require('../../service/api/axiosTiger');
const axiosPartner = require('../../service/api/axiosPartner');
const partnerOrderSchema = require('../../schemas/joi/partnerOrderSchema');
const partnerOrderValidationMW = require('../../middleware/validation/partnerOrderValidationMW');
const partnerAuthMW = require('../../middleware/auth/partnerAuthMW');
const checkIsOrderExistMW = require('../../middleware/order/checkOrderExistMW');
const Order = require('../../schemas/mongodb/Order');
const {OrderStates} = require('../../constants/constants');

const ordersRouter = new Router();

const checkOrderStatus = async (orderId, outbound) => {
	try {
		const response = await axiosTiger.get(`/orders/${orderId}/state`);
		const status = response.data['State'];
		console.log('response', response.data);
		if (status !== 'Finished') {
			return setTimeout(() => checkOrderStatus(orderId), 5000);
		} else {
			console.log(`Finished!!!!`);
			const body = { "state": status };
			const headers = {"x-api-key": outbound};
			await Order.findOneAndUpdate({"OrderID": orderId}, {"State": OrderStates.FINISHED});
			const response = await axiosPartner.patch(`/orders/${orderId}`, body, {headers});
			console.log(`Finished, response`, response.status);
		}
	} catch (err) {
		console.log('checkorderStatus Error', err);
	}
}
// validate partners credentials
// if validation true => next to body validation
// if validation false => 403 forbidden

// validate partnersOrder body
// convert partners body to tigers body
// if validation true => create new tigers order
// if validation false => save order to data base
// res send status ok + empty body

// --- create new tiger order
// save body to DB
// post new order
// start checking status
// when status finished => patch partner status

const saveTigerOrder = async (body) => {
	const order = new Order(body);
	await order.save();
	console.log('order saved');
}

const createTigerOrder = async (body, outbound) => {
	const orderId = body["OrderID"];
	try {
		await saveTigerOrder(body);
		await axiosTiger.post('/orders', body);
		checkOrderStatus(orderId, outbound);
	} catch (err) {
		console.log('something went wrong', err.message);
	}
}

const orderMiddlewares = [
	partnerAuthMW(),
	checkIsOrderExistMW(),
	partnerOrderValidationMW(partnerOrderSchema)
];

ordersRouter.post('/', orderMiddlewares, async (req, res) => {
	console.log('res.locals.validated', res.locals.validated);
	const validated = res.locals.validated;
	const {outbound} = res.locals.credentials;
	const convertedbody = convertBodyByTemplate(req.body, partnerToTigerConversionTemplate);
	const body = {
		...convertedbody,
		"InvoiceSendLater": false,
		"Issued": getDateByISO8601(),
		"OrderType": "standard",
		State: OrderStates.NEW,
		Validated: validated
	};

	res.status(200).json({});
	return validated ? createTigerOrder(body, outbound) : saveTigerOrder(body);
});

module.exports = ordersRouter;