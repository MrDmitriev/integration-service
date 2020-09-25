'use strict';
const PartnerCredential = require('../../schemas/mongodb/partnerCredential');

module.exports = () => (
	async (req, res, next) => {
		if (!req.headers['x-api-key']) {
			return res.status(401).json({message: 'missing x-api-key in headers'})
		}

		try {
			const inbound = req.headers['x-api-key'];
			const credentials = await PartnerCredential.findOne({inbound});

			if (credentials) {
				res.locals.credentials = credentials;
				console.log('Auth succeeded');
			} else {
				console.log('Auth failed');
				return res.status(403).json({message: 'Wrong inbound credential'});
			}
			
		} catch (err) {
			console.log('Auth failed', err.message);
		}

		next();
	}
);