import { useContext, useState, useEffect } from "react";
import OrderFormContext from "@/components/Home/OrderForm/OrderFormNewWrapper";
// import useMarketBestPricehandler from "./useMarketBestPricehandler";
import { useSelector } from "react-redux";
import Branch from "branch-sdk";
import { GetAppURL } from "@/frontend-api-service/Base";
import { getUserReferralCode } from "@/frontend-api-service/Api/Setting/Reward/Rewards";
import { useCheckLoginStatus } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
interface LevergaeState {
  leverage: number;
  sym: string;
}
export const useShareOrderForm = () => {
  const { state } = useContext(OrderFormContext);
  const [expiryMinutes, setexpiryMinutes] = useState(30);
  const [userReferralCode, setuserReferralCode] = useState("");
  const [orderFormDeepLink, setOrderFormDeepLink] = useState({
    message: "",
    url: ""
  });
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol?.toUpperCase());

  const leverageFromServer = useSelector((state: { positionsDirectory: { leverage: LevergaeState[] } }) => state.positionsDirectory.leverage).find(
    (item: { sym: string }) => item.sym === symbol?.toUpperCase()
  );
  const { isLoggedIn } = useCheckLoginStatus();
  useEffect(() => {
    if (isLoggedIn) {
      getUserReferralCode().then((data: { data: { referralCode: string } }) => {
        setuserReferralCode(data?.data?.referralCode);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    createDeepLinkOrderForm(30);
  }, []);
  const { side, size, OrderType, triggerPrice, limitPrice, takeProfit, stopLoss, isReduceOnly, isTakeProfitStopLossActive } = state;

  function ReturnOrderType(type: number) {
    if (type === 0) {
      return "MARKET";
    } else if (type === 1) {
      return "LIMIT";
    } else if (type === 2) {
      return "STOP MARKET";
    } else if (type === 3) {
      return "STOP LIMIT";
    }
  }

  const createDeepLinkOrderForm = (expiryMinutes = 30) => {
    const now = new Date();
    const expiryDate = now.getTime() + expiryMinutes * 60 * 1000; // Set expiry time to expiryMinutes from now
    const linkData = {
      method: "POST",
      url: "https://api2.branch.io/v1/url",
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      data: {
        $fallback_url: GetAppURL(),
        $desktop_url: GetAppURL(),
        $ios_url: "https://apps.apple.com/in/app/density/id6449458595",
        $android_url: "https://play.google.com/store/apps/details?id=com.densityexchange",
        symbol,
        OrderType,
        side,
        leverage: leverageFromServer?.leverage,
        triggerPrice,
        limitPrice,
        isTakeProfitStopLossActive,
        takeProfit,
        stopLoss,
        isReduceOnly,
        size: size,
        referralCode: userReferralCode,
        $exp_date1: expiryDate
      }
    };
    Branch.link(linkData, function (err: any, link: string) {
      if (err) {
        return;
      }
      const messageLines = [];
      messageLines.push("Hey, checkout this Trade on Density!\n");
      messageLines.push(`Type: ${ReturnOrderType(OrderType)}`);
      messageLines.push(`Symbol: ${symbol?.toUpperCase()}`);
      messageLines.push(`Side: ${side}`);
      messageLines.push(`Leverage: ${leverageFromServer?.leverage}`);
      if (limitPrice !== "") {
        messageLines.push(`Limit Price: ${limitPrice}`);
      }
      if (triggerPrice !== "") {
        messageLines.push(`Trigger Price: ${triggerPrice}`);
      }
      if (takeProfit !== "") {
        messageLines.push(`Take Profit: ${takeProfit}`);
      }
      if (stopLoss !== "") {
        messageLines.push(`Stop Loss: ${stopLoss}`);
      }
      if (isReduceOnly === true) {
        messageLines.push(`Reduce Only: ${String(isReduceOnly)}`);
      }
      messageLines.push(`Size: ${size} ${symbol?.toUpperCase().replace("USDT", "")}`);
      messageLines.push(`Link: ${link}`);

      const message = messageLines.join("\n");

      setOrderFormDeepLink({
        message,
        url: link
      });
    });
  };

  return {
    createDeepLinkOrderForm,
    orderFormDeepLink,
    expiryMinutes,
    setexpiryMinutes
  };
};
