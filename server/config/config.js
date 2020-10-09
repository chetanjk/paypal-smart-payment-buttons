"use strict";

exports.__esModule = true;
exports.EXPERIMENT_TIMEOUT = exports.WALLET_TIMEOUT = exports.FUNDING_ELIGIBILITY_TIMEOUT = exports.SMART_BUTTONS_CDN_NAMESPACE = exports.SDK_CDN_NAMESPACE = exports.BROWSER_CACHE_TIME = exports.MENU_CLIENT_MIN_JS = exports.MENU_CLIENT_JS = exports.BUTTON_CLIENT_MIN_JS = exports.BUTTON_CLIENT_JS = exports.BUTTON_RENDER_JS = exports.BUTTON_CLIENT_MODULE = exports.BUTTON_RENDER_CHILD_MODULE = exports.BUTTON_RENDER_MODULE = exports.MODULE_DIR = exports.WEBPACK_CONFIG = exports.FRAUDNET_ID = exports.FNCLS = exports.MODULE_POLL_INTERVAL = void 0;

var _path = require("path");

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODULE_POLL_INTERVAL = 5 * 60;
exports.MODULE_POLL_INTERVAL = MODULE_POLL_INTERVAL;
const FNCLS = 'fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99';
exports.FNCLS = FNCLS;
const FRAUDNET_ID = 'SMART_PAYMENT_BUTTONS';
exports.FRAUDNET_ID = FRAUDNET_ID;
const WEBPACK_CONFIG = 'webpack.config';
exports.WEBPACK_CONFIG = WEBPACK_CONFIG;
const MODULE_DIR = (0, _path.join)(__dirname, '..');
exports.MODULE_DIR = MODULE_DIR;
const BUTTON_RENDER_MODULE = '@paypal/sdk-release';
exports.BUTTON_RENDER_MODULE = BUTTON_RENDER_MODULE;
const BUTTON_RENDER_CHILD_MODULE = '@paypal/checkout-components';
exports.BUTTON_RENDER_CHILD_MODULE = BUTTON_RENDER_CHILD_MODULE;
const BUTTON_CLIENT_MODULE = _package.default.name;
exports.BUTTON_CLIENT_MODULE = BUTTON_CLIENT_MODULE;
const BUTTON_RENDER_JS = 'dist/button.js';
exports.BUTTON_RENDER_JS = BUTTON_RENDER_JS;
const BUTTON_CLIENT_JS = 'dist/smart-payment-buttons.js';
exports.BUTTON_CLIENT_JS = BUTTON_CLIENT_JS;
const BUTTON_CLIENT_MIN_JS = 'dist/smart-payment-buttons.min.js';
exports.BUTTON_CLIENT_MIN_JS = BUTTON_CLIENT_MIN_JS;
const MENU_CLIENT_JS = 'dist/smart-menu.js';
exports.MENU_CLIENT_JS = MENU_CLIENT_JS;
const MENU_CLIENT_MIN_JS = 'dist/smart-menu.min.js';
exports.MENU_CLIENT_MIN_JS = MENU_CLIENT_MIN_JS;
const BROWSER_CACHE_TIME = 6 * 60 * 60;
exports.BROWSER_CACHE_TIME = BROWSER_CACHE_TIME;
const SDK_CDN_NAMESPACE = 'https://www.paypalobjects.com/js-sdk-release';
exports.SDK_CDN_NAMESPACE = SDK_CDN_NAMESPACE;
const SMART_BUTTONS_CDN_NAMESPACE = 'https://www.paypalobjects.com/smart-payment-buttons';
exports.SMART_BUTTONS_CDN_NAMESPACE = SMART_BUTTONS_CDN_NAMESPACE;
const FUNDING_ELIGIBILITY_TIMEOUT = 100;
exports.FUNDING_ELIGIBILITY_TIMEOUT = FUNDING_ELIGIBILITY_TIMEOUT;
const WALLET_TIMEOUT = 2000;
exports.WALLET_TIMEOUT = WALLET_TIMEOUT;
const EXPERIMENT_TIMEOUT = 100;
exports.EXPERIMENT_TIMEOUT = EXPERIMENT_TIMEOUT;