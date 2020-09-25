'use strict';
const {getLogger} = require('../../utils/logger');
const {HTTP_CODES} = require('../../constants/constants');

const PartnerCredential = require('../../schemas/mongodb/partnerCredential');

const logger = getLogger();

module.exports = () => (
	async (req, res, next) => {
		if (!req.headers['x-api-key']) {
			return res.status(HTTP_CODES.UNAUTHORIZED).json({message: 'missing x-api-key in headers'})
		}

		try {
			const inbound = req.headers['x-api-key'];
			const credentials = await PartnerCredential.findOne({inbound});
			if (credentials) {
				logger.info('Success: authentication');
				res.locals.credentials = credentials;
			} else {
				logger.warn('Failed: authentication. Wrong credentials');
				return res.status(HTTP_CODES.FORBIDDEN).json({message: 'Wrong inbound credential'});
			}
		} catch (err) {
			logger.warn(`Failed: authentication ${err.message}`);
		}

		next();
	}
);