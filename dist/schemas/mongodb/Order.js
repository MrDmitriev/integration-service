"use strict";
const { Schema, model } = require('mongoose');
const schema = new Schema({
    "Validated": { required: true, type: Boolean },
    "State": { required: true, type: String },
    "OrderID": { required: false, type: String },
    "InvoiceSendLater": { required: false, type: String },
    "Issued": { required: false, type: String },
    "OrderType": { required: false, type: String },
    "Shipping": {
        "CarrierID": { required: false, type: Number },
        "DeliveryAddress": {
            "AddressLine1": { required: false, type: String },
            "AddressLine2": { required: false, type: String },
            "City": { required: false, type: String },
            "Company": { required: false, type: String },
            "CountryCode": { required: false, type: String },
            "Email": { required: false, type: String },
            "Personrequired": { required: false, type: String },
            "Phone": { required: false, type: String },
            "State": { required: false, type: String },
            "Zip": { required: false, type: String },
        }
    },
    "Products": [
        {
            "Barcode": { required: false, type: String },
            "OPTProductID": { required: false, type: String },
            "Qty": { required: false, type: Number },
        }
    ]
});
module.exports = model('Order', schema);
//# sourceMappingURL=Order.js.map