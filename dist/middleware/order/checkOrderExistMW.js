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
const Order = require('../../schemas/mongodb/Order');
const { getLogger } = require('../../utils/logger');
const logger = getLogger();
module.exports = () => ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = body["id"];
    try {
        const orderExist = yield Order.findOne({ "OrderID": id });
        if (orderExist) {
            logger.warn(`Warning: Order ${id} is already exist`);
            return res.status(200).json({ message: 'order already exist', id });
        }
    }
    catch (err) {
        logger.error(`Failed: checking is order exist ${err.message}`);
    }
    next();
}));
//# sourceMappingURL=checkOrderExistMW.js.map