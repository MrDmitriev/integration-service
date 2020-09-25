const HTTP_CODES = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404
}

const CarrierCodes = {
	"DPD": 1001,
	"DHL": 1002,
	"DHL Express": 1003,
	"UPS": 1004,
	"GLS": 1005
};

const AXIOS_REQUEST_TIMEOUT = 10000;
const ORDER_STATUS_TIMEOUT = 60000;

const OrderStates = {
	NEW: 'New',
	PENDING: 'Pending',
	IN_PRODUCTION: 'InProduction',
	FINISHED: 'Finished'
}

module.exports = {
	CarrierCodes,
	OrderStates,
	AXIOS_REQUEST_TIMEOUT,
	ORDER_STATUS_TIMEOUT,
	HTTP_CODES
}