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
const express = require('express');
const mongoose = require('mongoose');
const { getLogger } = require('../utils/logger');
const ordersRouter = require('./routes/orders');
const { DEFAULT_PORT } = require('../constants/constants');
const PORT = process.env.PORT || DEFAULT_PORT;
const app = express();
const logger = getLogger();
require(`dotenv`).config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/orders', ordersRouter);
app.get('/', (req, res) => res.end(`<h1>Hello page. PORT: ${PORT}</h1>`));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(process.env.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            logger.info(`Server started successfully on: PORT:${PORT}`);
        });
    }
    catch (err) {
        logger.error('Starting server failed', err);
    }
});
start();
//# sourceMappingURL=index.js.map