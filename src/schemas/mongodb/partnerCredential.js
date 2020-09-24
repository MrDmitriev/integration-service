const { Schema, model } = require('mongoose');

const schema = new Schema({
	inbound: {required: true, type: String},
	outbound: {required: true, type: String},
});

module.exports = model('PartnerCredential', schema);