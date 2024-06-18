import React, { useEffect, useState } from "react";

import SignalTradingIcon from "@/assets/icons/SideBar/SignalTrading";
import MarketIcon from "../../../../assets/icons/SideBar/MarketIcon";
import PortfolioIcon from "../../../../assets/icons/SideBar/PortfolioIcon";
import TradeIcon from "../../../../assets/icons/SideBar/TradeIcon";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SideBarIconButton from "../SideBarIconButton";
import LeaderBoardIcon from "@/assets/icons/SideBar/LeaderBoardIcon";
import { useSelector } from "react-redux";
import { useFeatureFlagEnabled } from "posthog-js/react";
const TradePageIcons = () => {
  const [activeTradePageButton, setActiveTradePageButton] = useState("market");
  const navigate = useNavigate();
  const theme = useTheme();
  const { userType } = useSelector((state: any) => state.SignalTrading.userPersonna);
  const showSignalTrading = useFeatureFlagEnabled("signal-trading");
  const handleSignalRouting = () => {
    switch (userType) {
      case "FOLLOWER":
        navigate("/signal-trading/user");
        break;
      case "ANALYST":
        navigate("/signal-trading/analyst");
        break;
      default:
        navigate("/signal-trading");
    }
  };
  //useEffect will update State on update state
  useEffect(() => {
    switch (window.location.pathname) {
      case "/portfolio":
        setActiveTradePageButton("portfolio");
        break;
      case "/market":
      case "/market/all-news":
        setActiveTradePageButton("market");
        break;
      case "/trade":
        setActiveTradePageButton("trade");
        break;
      case "/":
        setActiveTradePageButton("trade");
        break;
      case "/leaderboard":
        setActiveTradePageButton("leaderboard");
        break;
      case "/signal-trading":
      case "/signal-trading/user":
      case "/signal-trading/analyst":
        setActiveTradePageButton("signaltrading");
        break;
      default:
        setActiveTradePageButton("");
    }
  }, [window.location.pathname]);
  return (
    <>
      <SideBarIconButton
        onClick={() => navigate("/")}
        iconComponent={
          <TradeIcon
            strokeColor={activeTradePageButton === "trade" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`}
            fill={activeTradePageButton === "trade" ? `${theme.palette.neutral.black}` : "none"}
          />
        }
        selected={activeTradePageButton === "trade"}
        label={"Trade"}
      />
      <SideBarIconButton
        onClick={() => navigate("/market")}
        iconComponent={<MarketIcon strokeColor={activeTradePageButton === "market" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`} />}
        selected={activeTradePageButton === "market"}
        label={"Market"}
      />
      <SideBarIconButton
        onClick={() => navigate("/portfolio")}
        iconComponent={
          <PortfolioIcon
            strokeColor={activeTradePageButton === "portfolio" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`}
            fill={activeTradePageButton === "portfolio" ? `${theme.palette.neutral.black}` : "none"}
          />
        }
        selected={activeTradePageButton === "portfolio"}
        label={"Portfolio"}
      />
      <SideBarIconButton
        onClick={() => navigate("/leaderboard")}
        iconComponent={<LeaderBoardIcon fill={activeTradePageButton === "leaderboard" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`} />}
        selected={activeTradePageButton === "leaderboard"}
        label={" Leader board"}
      />
      {showSignalTrading && (
        <SideBarIconButton
          onClick={handleSignalRouting}
          iconComponent={<SignalTradingIcon fill={activeTradePageButton === "signaltrading" ? `${theme.palette.neutral.black}` : `${theme.palette.neutral.grey7}`} />}
          selected={activeTradePageButton === "signaltrading"}
          label={"Signal Trading"}
        />
      )}
    </>
  );
};

export default TradePageIcons;
