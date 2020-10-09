"use strict";

exports.__esModule = true;
exports.getButtonMiddleware = getButtonMiddleware;

var _jsxPragmatic = require("jsx-pragmatic");

var _sdkConstants = require("@paypal/sdk-constants");

var _belter = require("belter");

var _lib = require("../../lib");

var _service = require("../../service");

var _config = require("../../config");

var _script = require("./script");

var _constants = require("./constants");

var _params = require("./params");

var _style = require("./style");

var _instrumentation = require("./instrumentation");

function getButtonMiddleware({
  logger = _lib.defaultLogger,
  content: smartContent,
  graphQL,
  getAccessToken,
  getMerchantID,
  cache,
  getInlineGuestExperiment = () => Promise.resolve(false),
  firebaseConfig,
  tracking
} = {}) {
  return (0, _lib.sdkMiddleware)({
    logger,
    cache
  }, {
    app: async ({
      req,
      res,
      params,
      meta,
      logBuffer,
      sdkMeta
    }) => {
      logger.info(req, _constants.EVENT.RENDER);
      tracking(req);
      const {
        env,
        clientID,
        buttonSessionID,
        cspNonce,
        debug,
        buyerCountry,
        disableFunding,
        disableCard,
        userIDToken,
        amount,
        merchantID: sdkMerchantID,
        currency,
        intent,
        commit,
        vault,
        clientAccessToken,
        basicFundingEligibility,
        locale,
        clientMetadataID,
        pageSessionID,
        correlationID,
        cookies,
        enableFunding
      } = (0, _params.getParams)(params, req, res);
      logger.info(req, `button_params`, {
        params: JSON.stringify(params)
      });

      if (!clientID) {
        return (0, _lib.clientErrorResponse)(res, 'Please provide a clientID query parameter');
      }

      const gqlBatch = (0, _lib.graphQLBatch)(req, graphQL, {
        env
      });
      const content = smartContent[locale.country][locale.lang] || {};
      const facilitatorAccessTokenPromise = getAccessToken(req, clientID);
      const merchantIDPromise = facilitatorAccessTokenPromise.then(facilitatorAccessToken => (0, _service.resolveMerchantID)(req, {
        merchantID: sdkMerchantID,
        getMerchantID,
        facilitatorAccessToken
      }));
      const clientPromise = (0, _script.getSmartPaymentButtonsClientScript)({
        debug,
        logBuffer,
        cache
      });
      const renderPromise = (0, _script.getPayPalSmartPaymentButtonsRenderScript)({
        logBuffer,
        cache
      });
      const isCardFieldsExperimentEnabledPromise = (0, _lib.promiseTimeout)(merchantIDPromise.then(merchantID => getInlineGuestExperiment(req, {
        merchantID: merchantID[0],
        locale,
        buttonSessionID,
        buyerCountry
      })), _config.EXPERIMENT_TIMEOUT).catch(() => false);
      const fundingEligibilityPromise = (0, _service.resolveFundingEligibility)(req, gqlBatch, {
        logger,
        clientID,
        merchantID: sdkMerchantID,
        buttonSessionID,
        currency,
        intent,
        commit,
        vault,
        disableFunding,
        disableCard,
        clientAccessToken,
        buyerCountry,
        basicFundingEligibility,
        enableFunding
      });
      const walletPromise = (0, _service.resolveWallet)(req, gqlBatch, {
        logger,
        clientID,
        merchantID: sdkMerchantID,
        buttonSessionID,
        currency,
        intent,
        commit,
        vault,
        amount,
        disableFunding,
        disableCard,
        clientAccessToken,
        buyerCountry,
        userIDToken
      }).catch(_belter.noop);
      gqlBatch.flush();
      let facilitatorAccessToken;

      try {
        facilitatorAccessToken = await facilitatorAccessTokenPromise;
      } catch (err) {
        if (err && err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
          return (0, _lib.clientErrorResponse)(res, 'Invalid clientID');
        }

        throw err;
      }

      const render = await renderPromise;
      const client = await clientPromise;
      const fundingEligibility = await fundingEligibilityPromise;
      const merchantID = await merchantIDPromise;
      const isCardFieldsExperimentEnabled = await isCardFieldsExperimentEnabledPromise;
      const wallet = await walletPromise;
      const eligibility = {
        cardFields: isCardFieldsExperimentEnabled
      };
      logger.info(req, `button_render_version_${render.version}`);
      logger.info(req, `button_client_version_${client.version}`);
      const buttonProps = { ...params,
        nonce: cspNonce,
        csp: {
          nonce: cspNonce
        },
        fundingEligibility,
        content,
        wallet
      };

      try {
        if (render.button.validateButtonProps) {
          render.button.validateButtonProps(buttonProps);
        }
      } catch (err) {
        return (0, _lib.clientErrorResponse)(res, err.stack || err.message);
      }

      const buttonHTML = render.button.Buttons(buttonProps).render((0, _jsxPragmatic.html)());
      const setupParams = {
        fundingEligibility,
        buyerCountry,
        cspNonce,
        merchantID,
        sdkMeta,
        wallet,
        correlationID,
        firebaseConfig,
        facilitatorAccessToken,
        eligibility,
        content,
        cookies
      };
      const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${cspNonce}" data-client-version="${client.version}" data-render-version="${render.version}">
                    <style nonce="${cspNonce}">${_style.buttonStyle}</style>
                    
                    <div id="buttons-container" class="buttons-container">${buttonHTML}</div>
                    <div id="card-fields-container" class="card-fields-container"></div>

                    ${meta.getSDKLoader({
        nonce: cspNonce
      })}
                    <script nonce="${cspNonce}">${client.script}</script>
                    <script nonce="${cspNonce}">spb.setupButton(${(0, _lib.safeJSON)(setupParams)})</script>
                    ${(0, _service.shouldRenderFraudnet)({
        wallet
      }) ? (0, _service.renderFraudnetScript)({
        id: clientMetadataID || pageSessionID,
        cspNonce,
        env
      }) : ''}
                </body>
            `;
      (0, _instrumentation.setRootTransaction)(req, {
        userIDToken,
        clientAccessToken
      });
      (0, _lib.allowFrame)(res);
      return (0, _lib.htmlResponse)(res, pageHTML);
    },
    script: async ({
      req,
      res,
      params,
      logBuffer
    }) => {
      logger.info(req, _constants.EVENT.RENDER);
      const {
        debug
      } = (0, _params.getParams)(params, req, res);
      const {
        script
      } = await (0, _script.getSmartPaymentButtonsClientScript)({
        debug,
        logBuffer,
        cache
      });
      return (0, _lib.javascriptResponse)(res, script);
    },
    preflight: ({
      req,
      res,
      params,
      logBuffer
    }) => {
      const {
        [_sdkConstants.SDK_QUERY_KEYS.CLIENT_ID]: clientID,
        [_sdkConstants.SDK_QUERY_KEYS.MERCHANT_ID]: merchantIDParam,
        [_sdkConstants.SDK_QUERY_KEYS.CURRENCY]: currency,
        [_constants.SPB_QUERY_KEYS.USER_ID_TOKEN]: userIDToken,
        [_constants.SPB_QUERY_KEYS.AMOUNT]: amount
      } = params;
      const merchantID = merchantIDParam ? merchantIDParam.split(',') : [];

      if (!clientID) {
        return (0, _lib.clientErrorResponse)(res, `Please provide a ${_sdkConstants.SDK_QUERY_KEYS.CLIENT_ID} query parameter`);
      }

      if (!userIDToken) {
        return (0, _lib.clientErrorResponse)(res, `Please provide a ${_constants.SPB_QUERY_KEYS.USER_ID_TOKEN} query parameter`);
      }

      for (const merchant of merchantID) {
        if (!merchant.match(/^[A-Z0-9]+$/)) {
          return (0, _lib.clientErrorResponse)(res, `Invalid ${_sdkConstants.SDK_QUERY_KEYS.MERCHANT_ID} query parameter`);
        }
      }

      if (currency && !(0, _belter.constHas)(_sdkConstants.CURRENCY, currency)) {
        return (0, _lib.clientErrorResponse)(res, `Invalid ${_sdkConstants.SDK_QUERY_KEYS.CURRENCY} query parameter`);
      }

      if (amount && !amount.match(/^\d+\.\d{2}$/)) {
        return (0, _lib.clientErrorResponse)(res, `Invalid ${_constants.SPB_QUERY_KEYS.AMOUNT} query parameter`);
      }

      const gqlBatch = (0, _lib.graphQLBatch)(req, graphQL);
      (0, _service.resolveWallet)(req, gqlBatch, {
        logger,
        clientID,
        merchantID,
        currency,
        amount,
        userIDToken
      }).catch(err => {
        logBuffer.warn('preflight_error', {
          err: (0, _belter.stringifyError)(err)
        });
      });
      gqlBatch.flush();
      return (0, _lib.emptyResponse)(res);
    }
  });
}