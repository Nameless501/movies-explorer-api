const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { CORS_CONFIG, DEFAULT_PORT, DEFAULT_DB_URL } = require('./utils/constants');
const { centralizedErrorHandler } = require('./utils/centralizedErrorHandler');
const { errorLogger } = require('./middlewares/logger');

const { DB_URL = DEFAULT_DB_URL } = process.env;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();

app.use(helmet());
app.use('*', cors(CORS_CONFIG));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', require('./routers'));

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);

app.listen(PORT);
