'use strict';
const { number } = require('@hapi/joi');
const PartnerCredential = require('../../schemas/mongodb/partnerCredential');
// const 
module.exports = () => (
	async (req, res, next) => {
		if (!req.headers['x-api-key']) {
			return res.status(401).json({message: 'missing x-api-key in headers'})
		}

		try {
			const inbound = req.headers['x-api-key'];
			const credentials = await PartnerCredential.findOne({inbound});
			res.locals.credentials = credentials;
			console.log('Auth succeeded');
		} catch (err) {
			console.log('Auth failed', err.massage);
			return res.status(403).json({message: 'Wrong inbound credential'});
		}

		next();
	}
);