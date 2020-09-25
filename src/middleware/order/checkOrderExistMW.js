'use strict';
const Order = require('../../schemas/mongodb/Order');

module.exports = () => (
	async (req, res, next) => {
		const { body } = req;
		const id = body["id"];
		try {
			const orderExist = await Order.findOne({"OrderID": id});
			if (orderExist) {
				return res.status(200).json({message: 'order already exist', id});
			}

		} catch (err) {
			console.log('Checking is order exist faild', err.message);
		}

		next();
	}
);
