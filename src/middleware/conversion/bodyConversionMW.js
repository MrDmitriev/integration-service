'use strict';
const {convertBodyByTemplate, getConversionTemplate} = require('../../utils/conversions');

module.exports = () => (
	(req, res, next) => {
		const validated = res.locals.validated;
		const partnerName = res.locals.credentials.name;
		const template = getConversionTemplate(partnerName);
		const convertedbody = convertBodyByTemplate(req.body, template);
		const completedBody = template.completeBody(convertedbody, validated);
		res.locals.convertedbody = completedBody;

		next();
	}
)