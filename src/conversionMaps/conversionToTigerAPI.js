// "tigerKey": "partnerKey" 
const partnerConversionMap = {
	"OrderID": "id",
	"InvoiceSendLater": true,
	"Issued": true,
	"OrderType": true,
	"Shipping": {
		"CarrierID": "carrierKey",
		"DeliveryAddress": {
			"AddressLine1": "addressLine1", 
			"AddressLine2": "addressLine2", 
			"City": "city", 
			"Company": "company", 
			"CountryCode": true,
			"Email": "email",
			"PersonName": "fullName",
			"Phone": "phone",
			"State": "country",
			"Zip": "zipCode",
		}
	},
	"Products": [
		{
			"Barcode": "eanCode",
			"OPTProductID": "productId",
			"Qty": "quantity",
		}
	]
};

const alfa = {
	x: 1,
	y: 2,
	z: {
		a: 1,
		b: 2
	}
};

module.exports = {
	partnerConversionMap,
	alfa
}