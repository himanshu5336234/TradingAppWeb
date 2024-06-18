import {
  SET_LTP_DATA,
  SET_MARK_PRICE_DATA,
  SET_TICKER_DATA,
  SET_DEPTH_UPDATE,
  SET_ALL_TICKER_DATA,
  SET_KLINES_DATA,
  SET_MARK_PRICE_ALL_DATA,
  ACTIVE_SYMBOLS_MAP
} from "../../redux/constants/Constants";
import createStore from "../../redux/store/configureStore";

export const ltpHandler = (sData) => {
  const ltp = {
    symbol: sData.s,
    ltp: sData.p,
    quantity: sData.q,
    f: sData.f,
    time: sData.T
  };
  createStore.dispatch({ type: SET_LTP_DATA, payload: ltp });
};

export const markPriceHandler = (sData) => {
  const marketSegmentData = {
    symbol: sData.s,
    markprice: sData.p,
    indexPrice: sData.i,
    fundingRate: sData.r,
    countDown: sData.T
  };
  createStore.dispatch({
    type: SET_MARK_PRICE_DATA,
    payload: marketSegmentData
  });
};
export const markPriceAllHandler = (sData, isReturn) => {
  const tradableSymbolList = createStore.getState().tradablesymbolList.tradablesymbolList;
  let allMarkPriceData = sData.filter((f) => tradableSymbolList.some((item) => item.symbol === f.s));
  allMarkPriceData = allMarkPriceData.map((data) => ({
    fundingRate: data.r,
    symbol: data.s
  }));
  if (isReturn) {
    return allMarkPriceData;
  } else {
    createStore.dispatch({
      type: SET_MARK_PRICE_ALL_DATA,
      payload: allMarkPriceData
    });
  }
};

export const depthUpdateHandler = (stream) => {
  createStore.dispatch({ type: SET_DEPTH_UPDATE, payload: stream });
};

export const tickerHandler = (sData) => {
  const tickerData = {
    symbol: sData.s,
    ltp: sData.c,
    change24hHigh: sData.h,
    change24hLow: sData.l,
    volume24h: sData.q,
    countDown: sData.T,
    change24h: sData.p,
    change24hpercent: sData.P
  };
  createStore.dispatch({ type: SET_TICKER_DATA, payload: tickerData });
};

export const allTickerHandler = (sData, isReturn) => {
  const tradableSymbolList = createStore.getState().tradablesymbolList.tradablesymbolList;
  let allSymbolsData = sData.filter((f) => tradableSymbolList.some((item) => item.symbol === f.s));

  allSymbolsData = allSymbolsData.map((symbol) => {
    symbol.colorIndicator = Math.sign(
      parseFloat(symbol.c) -
        parseFloat(
          createStore.getState().activeSymbolData.activeSymbols.filter((symbolFromStore) => symbolFromStore.symbol === symbol.s)[0] &&
            createStore.getState().activeSymbolData.activeSymbols.filter((symbolFromStore) => symbolFromStore.symbol === symbol.s)[0].previousLTP
        )
    );
    return symbol;
  });
  for (let i = 0; i < allSymbolsData.length; i++) {
    const dispatchParams = {
      symbol: allSymbolsData[i].s,
      percentage: allSymbolsData[i].P,
      lp: allSymbolsData[i].c,
      vol: allSymbolsData[i].q,
      open: allSymbolsData[i].o,
      high: allSymbolsData[i].h,
      low: allSymbolsData[i].l,
      numberofTrades: allSymbolsData[i].n,
      colorIndicator: allSymbolsData[i].colorIndicator,
      previousLTP: (allSymbolsData[i] && allSymbolsData[i].c) || "--",
      markPrice: allSymbolsData[i].p
    };
    if (isReturn) {
      return dispatchParams;
    } else {
      createStore.dispatch({
        type: SET_ALL_TICKER_DATA,
        payload: dispatchParams
      });
      createStore.dispatch({
        type: ACTIVE_SYMBOLS_MAP,
        payload: dispatchParams
      });
    }
  }
};

export const klinesHandler = (sData) => {
  const { o, h, l, v, c, T, t } = sData;
  const lastSocketData = {
    time: t,
    close: parseFloat(c),
    open: parseFloat(o),
    high: parseFloat(h),
    low: parseFloat(l),
    volume: parseFloat(v),
    closeTime: T,
    openTime: t
  };
  createStore.dispatch({ type: SET_KLINES_DATA, payload: lastSocketData });
};
