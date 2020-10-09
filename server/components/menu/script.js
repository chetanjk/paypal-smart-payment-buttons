"use strict";

exports.__esModule = true;
exports.compileLocalSmartMenuClientScript = compileLocalSmartMenuClientScript;
exports.getSmartMenuClientScript = getSmartMenuClientScript;

var _path = require("path");

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("../../config");

var _lib = require("../../lib");

var _watchers = require("../../watchers");

async function compileLocalSmartMenuClientScript() {
  const root = (0, _path.join)(__dirname, '../../..');
  const {
    WEBPACK_CONFIG_MENU_DEBUG
  } = (0, _lib.babelRequire)((0, _path.join)(root, _config.WEBPACK_CONFIG));
  const script = await (0, _lib.compileWebpack)(WEBPACK_CONFIG_MENU_DEBUG, root);
  return {
    script,
    version: _sdkConstants.ENV.LOCAL
  };
}

async function getSmartMenuClientScript({
  logBuffer,
  cache,
  debug = false
} = {}) {
  if ((0, _lib.isLocal)()) {
    return await compileLocalSmartMenuClientScript();
  }

  const watcher = (0, _watchers.getPayPalSmartPaymentButtonsWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get();
  const script = await watcher.read(debug ? _config.MENU_CLIENT_JS : _config.MENU_CLIENT_MIN_JS);
  return {
    script,
    version
  };
}