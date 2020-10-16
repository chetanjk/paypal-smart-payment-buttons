"use strict";

exports.__esModule = true;
exports.shouldRenderFraudnet = shouldRenderFraudnet;
exports.renderFraudnetScript = renderFraudnetScript;

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("../config");

var _lib = require("../lib");

const FRAUDNET_URL = {
  [_sdkConstants.ENV.LOCAL]: 'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
  [_sdkConstants.ENV.STAGE]: 'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
  [_sdkConstants.ENV.SANDBOX]: 'https://c.paypal.com/da/r/fb.js',
  [_sdkConstants.ENV.PRODUCTION]: 'https://c.paypal.com/da/r/fb.js',
  [_sdkConstants.ENV.TEST]: 'https://c.paypal.com/da/r/fb.js'
};

function shouldRenderFraudnet({
  wallet
}) {
  for (const fundingSource of Object.values(_sdkConstants.FUNDING)) {
    // $FlowFixMe
    const walletConfig = wallet && wallet[fundingSource];

    if (walletConfig && walletConfig.instruments && walletConfig.instruments.length) {
      if (walletConfig.instruments.some(instrument => {
        return instrument && instrument.tokenID;
      })) {
        return true;
      }
    }
  }

  return false;
}

function renderFraudnetScript({
  id,
  cspNonce,
  env
}) {
  const fraudnetConfig = {
    f: id,
    s: _config.FRAUDNET_ID
  };
  return `
        <script nonce="${cspNonce}" type="application/json" id="fconfig" fncls="${_config.FNCLS}">
            ${(0, _lib.safeJSON)(fraudnetConfig)}
        </script>
        <script nonce="${cspNonce}" type="text/javascript" src="${FRAUDNET_URL[env]}" async></script>
    `;
}