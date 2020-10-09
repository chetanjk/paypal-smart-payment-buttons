"use strict";

exports.__esModule = true;

var _buttons = require("./buttons");

Object.keys(_buttons).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _buttons[key];
});

var _menu = require("./menu");

Object.keys(_menu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _menu[key];
});