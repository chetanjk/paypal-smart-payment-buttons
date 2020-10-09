"use strict";

exports.__esModule = true;
exports.compileLocalSmartPaymentButtonRenderScript = compileLocalSmartPaymentButtonRenderScript;
exports.getPayPalSmartPaymentButtonsRenderScript = getPayPalSmartPaymentButtonsRenderScript;
exports.compileLocalSmartButtonsClientScript = compileLocalSmartButtonsClientScript;
exports.getSmartPaymentButtonsClientScript = getSmartPaymentButtonsClientScript;

var _path = require("path");

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("../../config");

var _lib = require("../../lib");

var _watchers = require("../../watchers");

async function compileLocalSmartPaymentButtonRenderScript(dir) {
  const {
    WEBPACK_CONFIG_BUTTON_RENDER
  } = (0, _lib.babelRequire)((0, _path.join)(dir, _config.WEBPACK_CONFIG));
  const button = (0, _lib.evalRequireScript)(await (0, _lib.compileWebpack)(WEBPACK_CONFIG_BUTTON_RENDER, dir));
  return {
    button,
    version: _sdkConstants.ENV.LOCAL
  };
}

async function getPayPalSmartPaymentButtonsRenderScript({
  logBuffer,
  cache
}) {
  if ((0, _lib.isLocal)() && process.env.BUTTON_RENDER_DIR) {
    return await compileLocalSmartPaymentButtonRenderScript(process.env.BUTTON_RENDER_DIR);
  }

  const watcher = (0, _watchers.getPayPalSDKWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get();
  const button = await watcher.importDependency(_config.BUTTON_RENDER_CHILD_MODULE, _config.BUTTON_RENDER_JS);
  return {
    button,
    version
  };
}

async function compileLocalSmartButtonsClientScript() {
  const root = (0, _path.join)(__dirname, '../../..');
  const {
    WEBPACK_CONFIG_BUTTONS_DEBUG
  } = (0, _lib.babelRequire)((0, _path.join)(root, _config.WEBPACK_CONFIG));
  const script = await (0, _lib.compileWebpack)(WEBPACK_CONFIG_BUTTONS_DEBUG, root);
  return {
    script,
    version: _sdkConstants.ENV.LOCAL
  };
}

async function getSmartPaymentButtonsClientScript({
  logBuffer,
  cache,
  debug = false
} = {}) {
  const val = true;

  if (val) {
    return await compileLocalSmartButtonsClientScript();
  }

  const watcher = (0, _watchers.getPayPalSmartPaymentButtonsWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get();
  const script = await watcher.read(debug ? _config.BUTTON_CLIENT_JS : _config.BUTTON_CLIENT_MIN_JS);
  return {
    script,
    version
  };
}