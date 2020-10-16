"use strict";

exports.__esModule = true;
exports.getLocalSmartPaymentButtonRenderScript = getLocalSmartPaymentButtonRenderScript;
exports.getPayPalSmartPaymentButtonsRenderScript = getPayPalSmartPaymentButtonsRenderScript;
exports.compileLocalSmartButtonsClientScript = compileLocalSmartButtonsClientScript;
exports.getSmartPaymentButtonsClientScript = getSmartPaymentButtonsClientScript;

var _path = require("path");

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("../../config");

var _lib = require("../../lib");

var _watchers = require("../../watchers");

const ROOT = (0, _path.join)(__dirname, '../../..');

async function getLocalSmartPaymentButtonRenderScript() {
  const webpackScriptPath = (0, _lib.resolveScript)((0, _path.join)(_config.BUTTON_RENDER_CHILD_MODULE, _config.WEBPACK_CONFIG));

  if (webpackScriptPath && (0, _lib.isLocal)()) {
    const dir = (0, _path.dirname)(webpackScriptPath);
    const {
      WEBPACK_CONFIG_BUTTON_RENDER
    } = (0, _lib.babelRequire)(webpackScriptPath);
    const button = (0, _lib.evalRequireScript)(await (0, _lib.compileWebpack)(WEBPACK_CONFIG_BUTTON_RENDER, dir));
    return {
      button,
      version: _sdkConstants.ENV.LOCAL
    };
  }

  const distScriptPath = (0, _lib.resolveScript)((0, _path.join)(_config.BUTTON_RENDER_CHILD_MODULE, _config.BUTTON_RENDER_JS));

  if (distScriptPath) {
    const button = (0, _lib.dynamicRequire)(distScriptPath);
    return {
      button,
      version: _sdkConstants.ENV.LOCAL
    };
  }
}

async function getPayPalSmartPaymentButtonsRenderScript({
  logBuffer,
  cache,
  useLocal = (0, _lib.isLocal)()
}) {
  if (useLocal) {
    const script = await getLocalSmartPaymentButtonRenderScript();

    if (script) {
      return script;
    }
  }

  const watcher = (0, _watchers.getPayPalSDKWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get(_config.ACTIVE_TAG);
  const button = await watcher.importDependency(_config.BUTTON_RENDER_CHILD_MODULE, _config.BUTTON_RENDER_JS);
  return {
    button,
    version
  };
}

async function compileLocalSmartButtonsClientScript() {
  const webpackScriptPath = (0, _lib.resolveScript)((0, _path.join)(ROOT, _config.WEBPACK_CONFIG));

  if (webpackScriptPath && (0, _lib.isLocal)()) {
    const {
      WEBPACK_CONFIG_BUTTONS_DEBUG
    } = (0, _lib.babelRequire)(webpackScriptPath);
    const script = await (0, _lib.compileWebpack)(WEBPACK_CONFIG_BUTTONS_DEBUG, ROOT);
    return {
      script,
      version: _sdkConstants.ENV.LOCAL
    };
  }

  const distScriptPath = (0, _lib.resolveScript)((0, _path.join)(_config.BUTTON_CLIENT_MODULE, _config.BUTTON_CLIENT_JS));

  if (distScriptPath) {
    const script = (0, _lib.dynamicRequire)(distScriptPath);
    return {
      script,
      version: _sdkConstants.ENV.LOCAL
    };
  }
}

async function getSmartPaymentButtonsClientScript({
  logBuffer,
  cache,
  debug = false,
  useLocal = (0, _lib.isLocal)()
} = {}) {
  const script = await compileLocalSmartButtonsClientScript();

  if (script) {
    return script;
  }
}