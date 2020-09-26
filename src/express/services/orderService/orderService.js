'use strict';
const {ORDER_STATUS_TIMEOUT, OrderStates} = require('../../../constants/constants');
const Order = require('../../../schemas/mongodb/Order');
const {getLogger} = require('../../../utils/logger');
const axiosTiger = require('../../services/api/axiosTiger');
const axiosPartner = require('../../services/api/axiosPartner');

const logger = getLogger();


const checkOrderStatus = async (orderId, outbound) => {
	try {
		const response = await axiosTiger.get(`/orders/${orderId}/state`);
		const status = response.data['State'];
		logger.info(`Success: get order state from Tiger API. Status: ${status}`);
		if (status !== OrderStates.FINISHED) {
			return setTimeout(() => checkOrderStatus(orderId, outbound), ORDER_STATUS_TIMEOUT);
		} else {
			logger.info(`Success: Order ${orderId} status is Finished`);
			const body = { "state": status };
			const headers = {"x-api-key": outbound};
			await Order.findOneAndUpdate({"OrderID": orderId}, {"State": OrderStates.FINISHED});
			logger.info(`Success: update order ${orderId} in data base`);
			const response = await axiosPartner.patch(`/orders/${orderId}`, body, {headers});
			logger.info(`Success: patched order ${orderId} state to Partner, ${response.status}`);
		}
	} catch (err) {
		logger.error(`Failed: check order ${orderId} status. ${err.message}`);
	}
}

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

module.exports = {
	createTigerOrder,
	saveTigerOrder,
	checkOrderStatus
}