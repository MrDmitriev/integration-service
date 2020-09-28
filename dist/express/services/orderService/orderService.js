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
const { ORDER_STATUS_TIMEOUT, OrderStates } = require('../../../constants/constants');
const Order = require('../../../schemas/mongodb/Order');
const { getLogger } = require('../../../utils/logger');
const axiosTiger = require('../../services/api/axiosTiger');
const axiosPartner = require('../../services/api/axiosPartner');
const logger = getLogger();
const checkOrderStatus = (orderId, outbound) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axiosTiger.get(`/orders/${orderId}/state`);
        const status = response.data['State'];
        logger.info(`Success: get order state from Tiger API. Status: ${status}`);
        if (status !== OrderStates.FINISHED) {
            return setTimeout(() => checkOrderStatus(orderId, outbound), ORDER_STATUS_TIMEOUT);
        }
        else {
            logger.info(`Success: Order ${orderId} status is Finished`);
            const body = { "state": status };
            const headers = { "x-api-key": outbound };
            yield Order.findOneAndUpdate({ "OrderID": orderId }, { "State": OrderStates.FINISHED });
            logger.info(`Success: update order ${orderId} in data base`);
            const response = yield axiosPartner.patch(`/orders/${orderId}`, body, { headers });
            logger.info(`Success: patched order ${orderId} state to Partner, ${response.status}`);
        }
    }
    catch (err) {
        logger.error(`Failed: check order ${orderId} status. ${err.message}`);
    }
});
const saveTigerOrderToDB = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new Order(body);
    yield order.save();
    logger.info(`Success: save new order ${body["OrderID"]} to data base`);
});
const createTigerOrder = (body, outbound) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = body["OrderID"];
    try {
        yield saveTigerOrderToDB(body);
        yield axiosTiger.post('/orders', body);
        logger.info(`Success: sent new order ${body["OrderID"]} to Tiger API`);
        checkOrderStatus(orderId, outbound);
    }
    catch (err) {
        logger.error(`Failed: sending new order ${body["OrderID"]} to Tiger API. ${err.message}`);
    }
});
module.exports = {
    createTigerOrder,
    saveTigerOrderToDB,
    checkOrderStatus
};
//# sourceMappingURL=orderService.js.map