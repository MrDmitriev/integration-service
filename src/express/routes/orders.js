'use strict';
const { Router } = require('express');
const { convertBodyByTemplate, getDateByISO8601 } = require('../../utils/conversions');
const tigerTemplate = require('../../conversionMaps/TigerTemplate');
const partnerOrderSchema = require('../../schemas/joi/partnerOrderSchema');
const partnerOrderValidationMW = require('../../middleware/validation/partnerOrderValidationMW');
const partnerAuthMW = require('../../middleware/auth/partnerAuthMW');
const checkIsOrderExistMW = require('../../middleware/order/checkOrderExistMW');
const {OrderStates, HTTP_CODES} = require('../../constants/constants');
const {createTigerOrder, saveTigerOrder} = require('../services/orderService/orderService');
const ordersRouter = new Router();

const orderMiddlewares = [
	partnerAuthMW(),
	checkIsOrderExistMW(),
	partnerOrderValidationMW(partnerOrderSchema),
	// convertBody
];

//convertBody:
// getTemplate
// convertByTemplate
// completeBody
// returnBody

ordersRouter.post('/', orderMiddlewares, async (req, res) => {
	const validated = res.locals.validated;
	const {outbound} = res.locals.credentials;
	const template = tigerTemplate;
	const convertedbody = convertBodyByTemplate(req.body, template);
	const body = template.completeBody(convertedbody, validated);
	console.log('convertedbody', body);

	res.status(HTTP_CODES.OK).json({});
	return validated ? createTigerOrder(body, outbound) : saveTigerOrder(body);
});

module.exports = ordersRouter;