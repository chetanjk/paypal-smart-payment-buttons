"use strict";

exports.__esModule = true;
exports.default = exports.WEBPACK_CONFIG_TEST = exports.WEBPACK_CONFIG_MENU_DEBUG = exports.WEBPACK_CONFIG_MENU_MIN = exports.WEBPACK_CONFIG_MENU = exports.WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG = exports.WEBPACK_CONFIG_BUTTONS_DEBUG = exports.WEBPACK_CONFIG_BUTTONS_MIN = exports.WEBPACK_CONFIG_BUTTONS = void 0;

var _webpack = require("grumbler-scripts/config/webpack.config");

var _globals = require("./globals");

/* eslint import/no-nodejs-modules: off, import/no-default-export: off */
const MODULE_NAME = 'spb';

function getSmartWebpackConfig({
  entry,
  env,
  filename,
  minify = true,
  debug = false,
  libraryTarget = 'window'
}) {
  return (0, _webpack.getWebpackConfig)({
    env,
    entry: `${__dirname}/${entry}`,
    modulename: MODULE_NAME,
    filename,
    minify,
    debug,
    libraryTarget,
    vars: _globals.globals,
    sourcemaps: false
  });
}

const WEBPACK_CONFIG_BUTTONS = getSmartWebpackConfig({
  entry: 'src/button',
  filename: 'smart-payment-buttons',
  minify: false,
  debug: true,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_BUTTONS = WEBPACK_CONFIG_BUTTONS;
const WEBPACK_CONFIG_BUTTONS_MIN = getSmartWebpackConfig({
  entry: 'src/button',
  filename: 'smart-payment-buttons',
  minify: true,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_BUTTONS_MIN = WEBPACK_CONFIG_BUTTONS_MIN;
const WEBPACK_CONFIG_BUTTONS_DEBUG = getSmartWebpackConfig({
  entry: 'src/button',
  filename: 'smart-payment-buttons',
  debug: true,
  minify: false,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_BUTTONS_DEBUG = WEBPACK_CONFIG_BUTTONS_DEBUG;
const WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG = getSmartWebpackConfig({
  env: 'local',
  entry: 'src/button',
  filename: 'smart-payment-buttons',
  debug: true,
  minify: false,
  vars: _globals.globals,
  libraryTarget: 'umd'
});
exports.WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG = WEBPACK_CONFIG_BUTTONS_LOCAL_DEBUG;
const WEBPACK_CONFIG_MENU = getSmartWebpackConfig({
  entry: 'src/menu',
  filename: 'smart-menu',
  minify: false,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_MENU = WEBPACK_CONFIG_MENU;
const WEBPACK_CONFIG_MENU_MIN = getSmartWebpackConfig({
  entry: 'src/menu',
  filename: 'smart-menu',
  minify: true,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_MENU_MIN = WEBPACK_CONFIG_MENU_MIN;
const WEBPACK_CONFIG_MENU_DEBUG = getSmartWebpackConfig({
  entry: 'src/menu',
  filename: 'smart-menu',
  debug: true,
  minify: false,
  vars: _globals.globals
});
exports.WEBPACK_CONFIG_MENU_DEBUG = WEBPACK_CONFIG_MENU_DEBUG;
const WEBPACK_CONFIG_TEST = (0, _webpack.getWebpackConfig)({
  modulename: MODULE_NAME,
  test: true,
  options: {
    devtool: 'inline-source-map'
  },
  vars: { ..._globals.globals,
    __TEST__: true
  }
});
exports.WEBPACK_CONFIG_TEST = WEBPACK_CONFIG_TEST;
var _default = [WEBPACK_CONFIG_BUTTONS, WEBPACK_CONFIG_BUTTONS_MIN, WEBPACK_CONFIG_MENU, WEBPACK_CONFIG_MENU_MIN];
exports.default = _default;