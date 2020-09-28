'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Router } = require('express');
const partnerOrderSchema = require('../../schemas/joi/partnerOrderSchema');
const partnerOrderValidationMW = require('../../middleware/validation/partnerOrderValidationMW');
const partnerAuthMW = require('../../middleware/auth/partnerAuthMW');
const checkIsOrderExistMW = require('../../middleware/order/checkOrderExistMW');
const convertBodyMW = require('../../middleware/conversion/bodyConversionMW');
const { HTTP_CODES } = require('../../constants/constants');
const { createTigerOrder, saveTigerOrderToDB } = require('../services/orderService/orderService');
const ordersRouter = new Router();
const orderMiddlewares = [
    partnerAuthMW(),
    checkIsOrderExistMW(),
    partnerOrderValidationMW(partnerOrderSchema),
    convertBodyMW()
];
ordersRouter.post('/', orderMiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { validated, credentials, convertedbody } = res.locals;
    const { outbound } = credentials;
    res.status(HTTP_CODES.OK).json({});
    return validated ? createTigerOrder(convertedbody, outbound) : saveTigerOrderToDB(convertedbody);
}));
module.exports = ordersRouter;
//# sourceMappingURL=orders.js.map