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
const {getLogger} = require('../../utils/logger');

const ordersRouter = new Router();
const logger = getLogger();

const checkOrderStatus = async (orderId, outbound) => {
	try {
		const response = await axiosTiger.get(`/orders/${orderId}/state`);
		const status = response.data['State'];
		logger.info(`Success: get order state from Tiger API. Status: ${status}`);
		if (status !== OrderStates.FINISHED) {
			return setTimeout(() => checkOrderStatus(orderId), 5000);
		} else {
			logger.info(`Success: Order ${orderId} status is Finished`);
			const body = { "state": status };
			const headers = {"x-api-key": outbound};
			await Order.findOneAndUpdate({"OrderID": orderId}, {"State": OrderStates.FINISHED});
			logger.info(`Success: update order ${orderId} in data base`);
			await axiosPartner.patch(`/orders/${orderId}`, body, {headers});
			logger.info(`Success: patched order ${orderId} state to Partner`);
		}
	} catch (err) {
		logger.error(`Failed: check order ${orderId} status. ${err.message}`);
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
	logger.info(`Success: save new order ${body["OrderID"]} to data base`);
}

const createTigerOrder = async (body, outbound) => {
	const orderId = body["OrderID"];
	try {
		await saveTigerOrder(body);
		await axiosTiger.post('/orders', body);
		logger.info(`Success: sent new order ${body["OrderID"]} to Tiger API`);
		checkOrderStatus(orderId, outbound);
	} catch (err) {
		logger.error(`Failed: sending new order ${body["OrderID"]} to Tiger API. ${err.message}`);
	}
}

const orderMiddlewares = [
	partnerAuthMW(),
	checkIsOrderExistMW(),
	partnerOrderValidationMW(partnerOrderSchema)
];

ordersRouter.post('/', orderMiddlewares, async (req, res) => {
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