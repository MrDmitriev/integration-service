// "tigerKey": "partnerKey" 
const {getDateByISO8601} = require('../utils/conversions');
const {OrderStates} = require('../constants/constants');


const tigerTemplate = {
	template: {
		"OrderID": {name: "id", type: 'String'},
		"InvoiceSendLater": {name: '', type: 'String'},
		"Issued": {name: '', type: 'String'},
		"OrderType": {name: '', type: 'String'},
		"Shipping": {
			"CarrierID": {name: "carrierKey", type: 'String'},
			"DeliveryAddress": {
				"AddressLine1": {name: "addressLine1", type: 'String'},
				"AddressLine2": {name: "addressLine2", type: 'String'},
				"City": {name: "city", type: 'String'},
				"Company": {name: "company", type: 'String'},
				"CountryCode": {name: "country", type: 'String', code: true},
				"Email": {name: "email", type: 'String'},
				"PersonName": {name: "fullName", type: 'String'},
				"Phone": {name: "phone", type: 'String'},
				"State": {name: "country", type: 'String'},
				"Zip": {name: "zipCode", type: 'String'},
			}
		},
		"Products": [
			{
				"Barcode": {name: "eanCode", type: 'String'},
				"OPTProductID": {name: "productId", type: 'String'},
				"Qty": {name: "quantity", type: 'Number'},
			}
		]
	},
	completeBody: (body, validated) => {
		const newBody = {
			...body,
			"InvoiceSendLater": false,
			"Issued": new Date(),
			"OrderType": "standard",
			State: OrderStates.NEW,
			Validated: validated
		}

		return newBody;
	}
}

module.exports = tigerTemplate;