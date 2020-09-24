'use strict';
const BAD_REQUEST_CODE = 400; // should delete before production

module.exports = (schema) => (
	async (req, res, next) => {
		const { body } = req;

		try {
			await schema.validateAsync(body, { abortEarly: false });
		} catch (err) {
			const { details } = err;
			res.status(BAD_REQUEST_CODE).json({
				message: details.map((errorDescription) => errorDescription.message),
				data: body
			});
			return;
		}

		next();
	}
);