'use strict';
const {getLogger} = require('../../utils/logger');

const PartnerCredential = require('../../schemas/mongodb/partnerCredential');

const logger = getLogger();

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
				logger.info('Success: authentication');
			} else {
				logger.warn('Failed: authentication. Wrong credentials');
				return res.status(403).json({message: 'Wrong inbound credential'});
			}
		} catch (err) {
			logger.warn(`Failed: authentication ${err.message}`);
		}

		next();
	}
);