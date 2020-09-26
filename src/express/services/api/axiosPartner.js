'use strict';
const axios = require('axios');

const {AXIOS_REQUEST_TIMEOUT} = require('../../../constants/constants');

const {getLogger} = require('../../../utils/logger');
const logger = getLogger();
const axiosPartner = axios.create({
	baseURL: 'https://us-central1-node-task-assignment.cloudfunctions.net/papi/api',
	timeout: AXIOS_REQUEST_TIMEOUT,
});

const onSuccess = (response) => {
	logger.info('Partners API request was successfull');
	return response;
};

const onError = (err) => {
	logger.error(`An error occured, while using Partners API:${err.message}`);
	return false;
}

axiosPartner.interceptors.response.use(onSuccess, onError);

module.exports = axiosPartner;