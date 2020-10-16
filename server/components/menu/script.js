"use strict";

exports.__esModule = true;
exports.compileLocalSmartMenuClientScript = compileLocalSmartMenuClientScript;
exports.getSmartMenuClientScript = getSmartMenuClientScript;

var _path = require("path");

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("../../config");

var _lib = require("../../lib");

var _watchers = require("../../watchers");

const ROOT = (0, _path.join)(__dirname, '../../..');

async function compileLocalSmartMenuClientScript() {
  const webpackScriptPath = (0, _lib.resolveScript)((0, _path.join)(ROOT, _config.WEBPACK_CONFIG));

  if (webpackScriptPath && (0, _lib.isLocal)()) {
    const {
      WEBPACK_CONFIG_MENU_DEBUG
    } = (0, _lib.babelRequire)(webpackScriptPath);
    const script = await (0, _lib.compileWebpack)(WEBPACK_CONFIG_MENU_DEBUG, ROOT);
    return {
      script,
      version: _sdkConstants.ENV.LOCAL
    };
  }

  const distScriptPath = (0, _lib.resolveScript)((0, _path.join)(_config.MENU_CLIENT_MODULE, _config.MENU_CLIENT_JS));

  if (distScriptPath) {
    const script = (0, _lib.dynamicRequire)(distScriptPath);
    return {
      script,
      version: _sdkConstants.ENV.LOCAL
    };
  }
}

async function getSmartMenuClientScript({
  logBuffer,
  cache,
  debug = false,
  useLocal = (0, _lib.isLocal)()
} = {}) {
  if (useLocal) {
    const script = await compileLocalSmartMenuClientScript();

    if (script) {
      return script;
    }
  }

  const watcher = (0, _watchers.getPayPalSmartPaymentButtonsWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get(_config.ACTIVE_TAG);
  const script = await watcher.read(debug ? _config.MENU_CLIENT_JS : _config.MENU_CLIENT_MIN_JS);
  return {
    script,
    version
  };
}