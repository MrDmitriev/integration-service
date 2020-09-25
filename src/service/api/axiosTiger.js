const axios = require('axios');

const axiosTiger = axios.create({
	baseURL: 'https://us-central1-node-task-assignment.cloudfunctions.net/oapi/api',
	timeout: 5000,
	headers: {
		Authorization: `Base ${process.env.tigerAuth}`
	}
});

const onSuccess = (response) => {
	console.log('Tigers API request was successfull');
	return response;
};

const onError = (err) => {
	console.error(`An error occured, while using Tigers API: `);
	return false;
}

axiosTiger.interceptors.response.use(onSuccess, onError);

module.exports = axiosTiger;