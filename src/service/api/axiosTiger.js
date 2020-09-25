'use strict';
const axios = require('axios');

const {getLogger} = require('../../utils/logger');
const logger = getLogger();
const axiosTiger = axios.create({
	baseURL: 'https://us-central1-node-task-assignment.cloudfunctions.net/oapi/api',
	timeout: 5000,
	headers: {
		Authorization: `Base ${process.env.tigerAuth}`
	}
});

const onSuccess = (response) => {
	logger.info('Tigers API request was successfull');
	return response;
};

const onError = (err) => {
	logger.error(`An error occured, while using Tigers API:${err.message}`);
	return false;
}

axiosTiger.interceptors.response.use(onSuccess, onError);

module.exports = axiosTiger;