"use strict";

exports.__esModule = true;
exports.SPB_QUERY_KEYS = exports.ROOT_TRANSACTION_NAME = exports.EVENT = void 0;
const EVENT = {
  RENDER: 'smart_button_render',
  ERROR: 'smart_button_error'
};
exports.EVENT = EVENT;
const ROOT_TRANSACTION_NAME = {
  SMART_BUTTONS: 'smart_buttons',
  SMART_BUTTONS_WALLET: 'smart_buttons_wallet',
  SMART_BUTTONS_VAULT: 'smart_buttons_vault'
};
exports.ROOT_TRANSACTION_NAME = ROOT_TRANSACTION_NAME;
const SPB_QUERY_KEYS = {
  AMOUNT: 'amount',
  USER_ID_TOKEN: 'user-id-token'
};
exports.SPB_QUERY_KEYS = SPB_QUERY_KEYS;