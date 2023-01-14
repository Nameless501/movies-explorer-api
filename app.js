const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { CORS_CONFIG } = require('./utils/constants');
const { centralizedErrorHandler } = require('./utils/centralizedErrorHandler');
const { limiter } = require('./utils/utils');
const { errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(limiter);
app.use(helmet());
app.use('*', cors(CORS_CONFIG));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', require('./routers/index'));

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
