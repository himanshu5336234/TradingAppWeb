/* eslint-disable no- */
import { fetchFiatBalanceApi, fiatBuyUsdt, fiatExchangeRateApi } from "../../../frontend-api-service/Api";
import { walletScreenRender } from "../../redux/actions/Internal/WalletScreenRender.ac";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WALLET_CONSTANTS } from "./Constants/WalletConstants.const";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { Format } from "@/helpers";
import { fetchFutureAccountDetails } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
export const useNewBuyModal = () => {
  const walletScreenRenderBoolean = useSelector((state) => state.walletScreenRender.walletScreenRenderFlag);
  const dispatch = useDispatch();
  const [INRConversionHelperText, setINRConversionHelperText] = useState("");
  const [showINRConversionStep, setShowINRConversionStep] = useState("main");
  const [conversionRateforUSDT, setConversionRateForUSDT] = useState(0);
  const [INRConversionAmount, setINRConversionAmount] = useState({
    amountInInr: "",
    amountInUsdt: "",
    fiatBalance: ""
  });
  const [loadingUsdtBuy, setLoadingUsdtBuy] = useState(false);
  const validateINRInput = (value) => {
    if (value === "") {
      setINRConversionHelperText("");
      return;
    }
    if (value < 0) {
      setINRConversionHelperText(WALLET_CONSTANTS.AMOUNT_NOT_NEGATIVE_LABEL);
    } else if (value > INRConversionAmount?.fiatBalance) {
      if (Math.trunc(parseFloat(value / conversionRateforUSDT) * 100) / 100 > 1000) {
        setINRConversionHelperText(Format(WALLET_CONSTANTS.MAXIMUM_USDT_BUY_LABEL, conversionRateforUSDT * 1000));
      } else {
        setINRConversionHelperText(WALLET_CONSTANTS.EXCEEDS_AVAILABLE_BALANCE_LABEL);
      }
    } else if (Math.trunc(parseFloat(value / conversionRateforUSDT) * 100) / 100 < WALLET_CONSTANTS.MINIMUM_USDT_BUY) {
      setINRConversionHelperText(Format(WALLET_CONSTANTS.MINIMUM_USDT_BUY_LABEL, conversionRateforUSDT));
    } else if (Math.trunc(parseFloat(value / conversionRateforUSDT) * 100) / 100 > 1000) {
      setINRConversionHelperText(Format(WALLET_CONSTANTS.MAXIMUM_USDT_BUY_LABEL, conversionRateforUSDT * 1000));
    } else {
      setINRConversionHelperText("");
    }
  };
  const SETINRAMOUNTDATA = useCallback(
    (payload) => {
      setINRConversionAmount(payload);
      validateINRInput(payload?.amountInInr);
    },
    [INRConversionAmount, conversionRateforUSDT]
  );
  // const SETTOGGLE = useCallback(() => {
  //   SetToggle(!Toggle);
  // }, [Toggle]);

  const INRtoUSDT = (payload) => {
    if (payload < 0) return;
    SETINRAMOUNTDATA({
      ...INRConversionAmount,
      amountInInr: payload,
      amountInUsdt: Math.trunc(parseFloat(payload / conversionRateforUSDT) * 100) / 100
    });
  };
  // const USDtoINR = (payload) => {
  //   SETINRAMOUNTDATA({
  //     ...INRConversionAmount,
  //     amountInUsdt: payload,
  //     amountInInr: parseFloat(payload * conversionRateforUSDT).toFixed(2)
  //   });
  // };
  const callfiatBuyUsdtAPI = () => {
    setLoadingUsdtBuy(true);
    fiatBuyUsdt(
      JSON.stringify({
        // Temp convertion to Float. ideally should be string for float types in payload
        amount: parseFloat(INRConversionAmount.amountInInr)
      })
    )
      .then((res) => {
        setLoadingUsdtBuy(false);
        if (res.data.message === "ok") setShowINRConversionStep("success");
        setTimeout(() => {
          dispatch(fetchFutureAccountDetails());
          dispatch(walletScreenRender(true, !walletScreenRenderBoolean));
        }, 2000);
        // setShowLoader(false);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FAIL_BUY_USDT",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
        setLoadingUsdtBuy(false);
      });
  };
  const handleINRConversionSubmit = () => {
    if (INRConversionHelperText.length > 0) return;
    if (INRConversionAmount?.amountInInr === "") {
      setINRConversionHelperText(WALLET_CONSTANTS.NOT_EMPTY_LABEL);
    } else {
      setShowINRConversionStep("confirm");
    }
  };
  const handleMaxClickForInr = (value) => {
    let maxValue;
    if (Math.trunc(parseFloat(value / conversionRateforUSDT) * 100) / 100 > 1000) {
      maxValue = Math.trunc(parseFloat(1000 * conversionRateforUSDT) * 100) / 100;
    } else {
      maxValue = Math.trunc(value * 100) / 100;
    }
    SETINRAMOUNTDATA({
      ...INRConversionAmount,
      amountInUsdt: Math.trunc(parseFloat(maxValue / conversionRateforUSDT) * 100) / 100,
      amountInInr: maxValue
    });
  };
  useEffect(() => {
    fiatExchangeRateApi()
      .then((successResponse) => {
        setConversionRateForUSDT(successResponse.data.inr);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_FIAT_EXCHANGE_RATE_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
    fetchFiatBalanceApi()
      .then((successResponse) => {
        SETINRAMOUNTDATA({
          ...INRConversionAmount,
          fiatBalance: successResponse.data.balance
        });
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_FIAT_BALANCE_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }, []);

  const primaryINRActionName = showINRConversionStep === "confirm" ? "confirm" : "Submit";
  return {
    INRConversionHelperText,
    INRConversionAmount,
    conversionRateforUSDT,
    SETINRAMOUNTDATA,
    INRtoUSDT,
    handleINRConversionSubmit,
    handleMaxClickForInr,
    callfiatBuyUsdtAPI,
    setShowINRConversionStep,
    primaryINRActionName,
    loadingUsdtBuy,
    showINRConversionStep
  };
};
