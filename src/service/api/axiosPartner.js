const axios = require('axios');

const axiosPartner = axios.create({
	baseURL: 'https://us-central1-node-task-assignment.cloudfunctions.net/papi/api',
  timeout: 5000,
});

const onSuccess = (response) => {
	console.log('Partners API request was successfull');
	return response;
};

const onError = (err) => {
	console.error(`An error occured, while using Partners API: `, err);
	return false;
}

axiosPartner.interceptors.response.use(onSuccess, onError);

module.exports = axiosPartner;