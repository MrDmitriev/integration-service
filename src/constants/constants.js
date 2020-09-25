const CarrierCodes = {
	"DPD": 1001,
	"DHL": 1002,
	"DHL Express": 1003,
	"UPS": 1004,
	"GLS": 1005
};

const OrderStates = {
	NEW: 'New',
	PENDING: 'Pending',
	IN_PRODUCTION: 'InProduction',
	FINISHED: 'Finished'
}

module.exports = {
	CarrierCodes,
	OrderStates
}