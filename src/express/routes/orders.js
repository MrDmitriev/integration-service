'use strict';
const { Router } = require('express');
const partnerOrderSchema = require('../../schemas/joi/partnerOrderSchema');
const partnerOrderValidationMW = require('../../middleware/validation/partnerOrderValidationMW');
const partnerAuthMW = require('../../middleware/auth/partnerAuthMW');
const checkIsOrderExistMW = require('../../middleware/order/checkOrderExistMW');
const convertBodyMW = require('../../middleware/conversion/bodyConversionMW');
const {HTTP_CODES} = require('../../constants/constants');
const {createTigerOrder, saveTigerOrderToDB} = require('../services/orderService/orderService');
const ordersRouter = new Router();

const orderMiddlewares = [
	partnerAuthMW(),
	checkIsOrderExistMW(),
	partnerOrderValidationMW(partnerOrderSchema),
	convertBodyMW()
];

ordersRouter.post('/', orderMiddlewares, async (req, res) => {
	const {validated, credentials, convertedbody} = res.locals;
	const {outbound} = credentials;

	res.status(HTTP_CODES.OK).json({});
	return validated ? createTigerOrder(convertedbody, outbound) : saveTigerOrderToDB(convertedbody);
});

module.exports = ordersRouter;