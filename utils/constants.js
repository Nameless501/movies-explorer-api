const BAD_REQUEST_CODE = 400;

const WRONG_LOGIN_CODE = 401;

const FORBIDDEN_CODE = 403;

const NOT_FOUND_CODE = 404;

const EMAIL_CONFLICT_CODE = 409;

const DEFAULT_ERROR_CODE = 500;

const CREATED_CODE = 201;

const BAD_REQUEST_MESSAGE = 'Некорректные данные';

const NOT_FOUND_MESSAGE = 'Данные не найдены';

const WRONG_LOGIN_MESSAGE = 'Неправильные почта или пароль';

const NEED_AUTH_MESSAGE = 'Необходима авторизация';

const EMAIL_CONFLICT_MESSAGE = 'Такой email уже зарегистрирован';

const FORBIDDEN_MESSAGE = 'Ошибка доступа';

const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const LOGOUT_MESSAGE = 'Выход из аккаунта успешно выполнен';

const LINK_REG_EXP = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https://nameless.nomoredomainsclub.ru',
  'http://nameless.nomoredomainsclub.ru',
];

const CORS_CONFIG = {
  origin: ORIGINS,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const DEFAULT_PORT = 3000;

const DEFAULT_DB_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  WRONG_LOGIN_CODE,
  DEFAULT_ERROR_CODE,
  EMAIL_CONFLICT_CODE,
  FORBIDDEN_CODE,
  CREATED_CODE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  WRONG_LOGIN_MESSAGE,
  NEED_AUTH_MESSAGE,
  EMAIL_CONFLICT_MESSAGE,
  FORBIDDEN_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
  LINK_REG_EXP,
  CORS_CONFIG,
  DEFAULT_PORT,
  DEFAULT_DB_URL,
};
