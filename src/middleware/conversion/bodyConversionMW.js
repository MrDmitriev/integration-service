'use strict';
const {convertBodyByTemplate, getConversionTemplate} = require('../../utils/conversions');
const TigerTemplate = require('../../conversionMaps/TigerTemplate');

module.exports = () => (
	(req, res, next) => {
		const validated = res.locals.validated;
		// const partnerName = res.locals.credentials.name;
		const template = new TigerTemplate(validated);
		console.log('conversionTemplate', template);
		const convertedbody = convertBodyByTemplate(req.body, template);
		const completedBody = template.completeBody(convertedbody);
		res.locals.convertedbody = completedBody;

		next();
	}
)