export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch"
};

export const envVariable = () => {
  return process.env.VITE_BUILD_TYPE;
  // window._env_.VITE_BUILD_TYPE || process.env.VITE_BUILD_TYPE;
};

export const isMobileDevice = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";

export const deploymentEnv = {
  PROD: "production",
  STAGING: "staging",
  SF: "sf",
  UAT: "uat",
  TEST: "test",
  DEV: "development",
  PREPROD: "pre_production",
  LOCAL: "local"
};

export const BASE_URL = () => {
  let binanceBaseUrl;
  let densityBaseUrl;
  let binanceWsBase;
  let densityWsBase;
  let densityOrderBookWsBase;
  let appUrl;
  let chartUrlBase;
  let chartUrl;
  let maintainceUrl;

  switch (envVariable()) {
    case deploymentEnv.PROD:
      // binanceBaseUrl = "https://market.density.exchange/api";
      binanceBaseUrl = "https://fapi.binance.com";
      densityBaseUrl = "https://api-prod.density.exchange";
      chartUrlBase = "https://market.density.exchange/api/";
      // binanceWsBase = "wss://market.density.exchange/stream";
      binanceWsBase = "wss://fstream.binance.com/stream";
      densityWsBase = "wss://api-prod.density.exchange/v1/order-and-account-updates?token={0}";
      appUrl = "app.density.exchange";
      chartUrl = "https://chart.density.exchange";
      maintainceUrl = "https://maintenance.density.exchange";
      break;
    case deploymentEnv.STAGING:
      binanceBaseUrl = "https://market.density.exchange/api/";
      densityBaseUrl = "https://api-stage.density.exchange";
      densityWsBase = "wss://api-stage.density.exchange/v1/order-and-account-updates?token={0}";
      chartUrlBase = "https://market.density.exchange/api/";
      binanceWsBase = "wss://market.density.exchange/stream";

      appUrl = "staging.pahal.cloud";
      chartUrl = "https://chart.density.exchange";
      maintainceUrl = "https://maintenance.density.exchange";
      break;

    case deploymentEnv.SF:
      binanceBaseUrl = "https://testnet.binancefuture.com";
      densityBaseUrl = "https://dev-api.densityexchange.org";
      chartUrlBase = "https://testnet.binancefuture.com";
      binanceWsBase = "wss://market-dev.densityexchange.org/stream";
      densityWsBase = "wss://dev-api.densityexchange.org/v1/order-and-account-updates?token={0}";
      densityOrderBookWsBase = "wss://dev-orderbook.densityexchange.org/v1/ws/order-book";
      appUrl = "sf-app.pahal.cloud";
      chartUrl = "https://chart-dev.density.exchange";
      maintainceUrl = "https://maintenance-dev.density.exchange";

      break;
    case deploymentEnv.TEST:
      binanceBaseUrl = "https://testnet.binancefuture.com";
      densityBaseUrl = "https://dev-api.densityexchange.org";
      chartUrlBase = "https://testnet.binancefuture.com";
      binanceWsBase = "wss://market-dev.densityexchange.org/stream";
      densityWsBase = "wss://api-dev2.density.exchange/v1/order-and-account-updates?token={0}";
      appUrl = "test-app.pahal.cloud";
      densityOrderBookWsBase = "wss://dev-orderbook.densityexchange.org/v1/ws/order-book";
      chartUrl = "https://chart-dev.density.exchange";
      maintainceUrl = "https://maintenance-dev.density.exchange";
      break;
    case deploymentEnv.UAT:
      binanceBaseUrl = "https://testnet.binancefuture.com";
      densityBaseUrl = "https://dev-api.densityexchange.org";
      chartUrlBase = "https://testnet.binancefuture.com";
      binanceWsBase = "wss://market-dev.densityexchange.org/stream";
      densityWsBase = "wss://api-dev2.density.exchange/v1/order-and-account-updates?token={0}";
      densityOrderBookWsBase = "wss://dev-orderbook.densityexchange.org/v1/ws/order-book";
      appUrl = "uat-app.pahal.cloud";
      chartUrl = "https://chart-dev.density.exchange";
      maintainceUrl = "https://maintenance-dev.density.exchange";
      break;
    case deploymentEnv.DEV:
      binanceBaseUrl = "https://testnet.binancefuture.com";
      densityBaseUrl = "https://dev-api.densityexchange.org";
      chartUrlBase = "https://testnet.binancefuture.com";
      binanceWsBase = "wss://market-dev.densityexchange.org/stream";
      densityWsBase = "wss://dev-api.densityexchange.org/v1/order-and-account-updates?token={0}";
      densityOrderBookWsBase = "wss://dev-orderbook.densityexchange.org/v1/ws/order-book";
      appUrl = "dev-app.pahal.cloud";
      chartUrl = "https://chart-dev.density.exchange";
      maintainceUrl = "https://maintenance-dev.density.exchange";
      break;
    case deploymentEnv.PREPROD:
      binanceBaseUrl = "https://market-m.density.exchange/api/";
      densityBaseUrl = "https://api-prod-m.density.exchange";
      chartUrlBase = "https://market-m.density.exchange/api/";
      binanceWsBase = "wss://market-m.density.exchange/stream";
      densityOrderBookWsBase = "wss://api-orderbook.density.exchange/v1/ws/order-book";
      densityWsBase = "wss://api-prod-m.density.exchange/v1/order-and-account-updates?token={0}";
      appUrl = "app-m.density.exchange";
      chartUrl = "https://chart.density.exchange";
      maintainceUrl = "https://maintenance.density.exchange";
      break;
    case deploymentEnv.LOCAL:
    default:
      binanceBaseUrl = "https://testnet.binancefuture.com";
      densityBaseUrl = "https://dev-api.densityexchange.org";
      chartUrlBase = "https://testnet.binancefuture.com";
      binanceWsBase = "wss://stream.binancefuture.com/stream";
      densityWsBase = "wss://dev-api.densityexchange.org/v1/order-and-account-updates?token={0}";
      appUrl = "https://localhost:3000";
      chartUrl = "https://chart-dev.density.exchange";
      maintainceUrl = "https://maintenance-dev.density.exchange";
      break;
  }

  return {
    binanceBaseUrl,
    densityOrderBookWsBase,
    densityBaseUrl,
    binanceWsBase,
    densityWsBase,
    chartUrlBase,
    appUrl,
    maintainceUrl,
    chartUrl
  };
};

export const GetAppURL = () => window.location.protocol + "//" + window.location.host;
