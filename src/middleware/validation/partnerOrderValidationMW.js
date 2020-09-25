'use strict';
module.exports = (schema) => (
	async (req, res, next) => {
		const { body } = req;

		try {
			await schema.validateAsync(body, { abortEarly: false });
			res.locals.validated = true;
		} catch (err) {
			res.locals.validated = false;
		}

		next();
	}
);