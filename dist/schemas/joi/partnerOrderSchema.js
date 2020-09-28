'use strict';
const Joi = require(`@hapi/joi`);
const { CarrierCodes } = require('../../constants/constants');
const validCarrierKeys = Object.keys(CarrierCodes);
const product = Joi.object({
    "productId": Joi.number().required(),
    "name": Joi.optional(),
    "quantity": Joi.number().required(),
    "weight": Joi.optional(),
    "eanCode": Joi.number().required()
});
module.exports = Joi.object({
    "id": Joi.number().required(),
    "fullName": Joi.string().required(),
    "email": Joi.string().email().required(),
    "phone": Joi.string().required(),
    "addressLine1": Joi.string().required(),
    "addressLine2": Joi.optional(),
    "company": Joi.optional(),
    "zipCode": Joi.number().required(),
    "city": Joi.string().required(),
    "country": Joi.string().required(),
    "carrierKey": Joi.string().valid(...validCarrierKeys).required(),
    "status": Joi.optional(),
    "details": Joi.array().items(product)
});
//# sourceMappingURL=partnerOrderSchema.js.map