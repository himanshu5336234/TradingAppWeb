export const tradableSymbolsMock = {
  symbols: [
    {
      symbol: "BTCUSDT",
      pair: "BTCUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "BTC",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["PoW"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "4529764",
          minPrice: "556.80",
          tickSize: "0.10"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "1000",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "120",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.017500",
      marketTakeBound: "0.05"
    },
    {
      symbol: "ETHUSDT",
      pair: "ETHUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "ETH",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Layer-1"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "306177",
          minPrice: "39.86",
          tickSize: "0.01"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "10000",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "2000",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.015000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "BCHUSDT",
      pair: "BCHUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "BCH",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["PoW"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "100000",
          minPrice: "13.93",
          tickSize: "0.01"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "10000",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "850",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.010000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "XRPUSDT",
      pair: "XRPUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "XRP",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 4,
      quantityPrecision: 1,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Payment"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "100000",
          minPrice: "0.0143",
          tickSize: "0.0001"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "20000000",
          minQty: "0.1",
          stepSize: "0.1"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "2000000",
          minQty: "0.1",
          stepSize: "0.1"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.015000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "LTCUSDT",
      pair: "LTCUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "LTC",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 2,
      quantityPrecision: 3,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["PoW"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "100000",
          minPrice: "3.61",
          tickSize: "0.01"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "10000",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "1500",
          minQty: "0.001",
          stepSize: "0.001"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.020000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "ADAUSDT",
      pair: "ADAUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "ADA",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 5,
      quantityPrecision: 0,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Layer-1"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "20000",
          minPrice: "0.01740",
          tickSize: "0.00010"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "2000000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "300000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.015000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "BNBUSDT",
      pair: "BNBUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "BNB",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 3,
      quantityPrecision: 2,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["CEX"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "100000",
          minPrice: "6.600",
          tickSize: "0.010"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "100000",
          minQty: "0.01",
          stepSize: "0.01"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "2000",
          minQty: "0.01",
          stepSize: "0.01"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.010000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "DOGEUSDT",
      pair: "DOGEUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "DOGE",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 6,
      quantityPrecision: 0,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Meme"],
      settlePlan: 0,
      triggerProtect: "0.1000",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "30",
          minPrice: "0.002440",
          tickSize: "0.000010"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "50000000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "30000000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.1000",
          multiplierDown: "0.9000",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.017500",
      marketTakeBound: "0.10"
    },
    {
      symbol: "SOLUSDT",
      pair: "SOLUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "SOL",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 4,
      quantityPrecision: 0,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Layer-1"],
      settlePlan: 0,
      triggerProtect: "0.0500",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "6857",
          minPrice: "0.4200",
          tickSize: "0.0010"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "1000000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "1000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.0500",
          multiplierDown: "0.9500",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.025000",
      marketTakeBound: "0.05"
    },
    {
      symbol: "MATICUSDT",
      pair: "MATICUSDT",
      contractType: "PERPETUAL",
      deliveryDate: 4133404800000,
      onboardDate: 1569398400000,
      status: "TRADING",
      maintMarginPercent: "2.5000",
      requiredMarginPercent: "5.0000",
      baseAsset: "MATIC",
      quoteAsset: "USDT",
      marginAsset: "USDT",
      pricePrecision: 5,
      quantityPrecision: 0,
      baseAssetPrecision: 8,
      quotePrecision: 8,
      underlyingType: "COIN",
      underlyingSubType: ["Layer-2"],
      settlePlan: 0,
      triggerProtect: "0.1000",
      filters: [
        {
          filterType: "PRICE_FILTER",
          maxPrice: "137",
          minPrice: "0.00960",
          tickSize: "0.00010"
        },
        {
          filterType: "LOT_SIZE",
          maxQty: "10000000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MARKET_LOT_SIZE",
          maxQty: "500000",
          minQty: "1",
          stepSize: "1"
        },
        {
          filterType: "MAX_NUM_ORDERS",
          limit: 200
        },
        {
          filterType: "MAX_NUM_ALGO_ORDERS",
          limit: 10
        },
        {
          filterType: "MIN_NOTIONAL",
          notional: "5"
        },
        {
          filterType: "PERCENT_PRICE",
          multiplierUp: "1.1000",
          multiplierDown: "0.9000",
          multiplierDecimal: "4"
        }
      ],
      OrderType: null,
      timeInForce: ["GTC", "IOC", "FOK", "GTX"],
      liquidationFee: "0.020000",
      marketTakeBound: "0.10"
    }
  ]
};
