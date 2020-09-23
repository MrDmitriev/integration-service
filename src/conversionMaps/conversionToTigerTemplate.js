// "tigerKey": "partnerKey" 
const partnerToTigerConversionTemplate = {
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
};



module.exports = {
	partnerToTigerConversionTemplate,
}