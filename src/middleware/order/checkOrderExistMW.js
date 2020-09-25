'use strict';
const Order = require('../../schemas/mongodb/Order');
const {getLogger} = require('../../utils/logger');

const logger = getLogger();
module.exports = () => (
	async (req, res, next) => {
		const { body } = req;
		const id = body["id"];
		try {
			const orderExist = await Order.findOne({"OrderID": id});
			if (orderExist) {
				logger.warn(`Warning: Order ${id} is already exist`);
				return res.status(200).json({message: 'order already exist', id});
			}

		} catch (err) {
			logger.error(`Failed: checking is order exist ${err.message}`);
		}

		next();
	}
);
