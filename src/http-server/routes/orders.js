'use strict';
const {Router} = require('express');

const {updateBodyValues} = require('../../utils/utils');
const {partnerConversionMap} = require('../../conversionMaps/conversionToTigerAPI');

const ordersRouter = new Router();

ordersRouter.post('/', async (req, res) => {
		console.log('ordersRouter post');
		await updateBodyValues('fff', partnerConversionMap);
		res.status(200).json({});
});

module.exports = ordersRouter;