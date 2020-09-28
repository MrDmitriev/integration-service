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
const { getLogger } = require('../../utils/logger');
const { HTTP_CODES } = require('../../constants/constants');
const PartnerCredential = require('../../schemas/mongodb/partnerCredential');
const logger = getLogger();
module.exports = () => ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers['x-api-key']) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ message: 'missing x-api-key in headers' });
    }
    try {
        const inbound = req.headers['x-api-key'];
        const credentials = yield PartnerCredential.findOne({ inbound });
        if (credentials) {
            logger.info('Success: authentication');
            res.locals.credentials = credentials;
        }
        else {
            logger.warn('Failed: authentication. Wrong credentials');
            return res.status(HTTP_CODES.FORBIDDEN).json({ message: 'Wrong inbound credential' });
        }
    }
    catch (err) {
        logger.warn(`Failed: authentication ${err.message}`);
    }
    next();
}));
//# sourceMappingURL=partnerAuthMW.js.map