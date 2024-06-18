import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSignalListForAnAnalyst, fetchSignalListForFollowers, fetchUserPersonna } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import { Box, Typography } from "@mui/material";

import OrderFormContext from "./OrderFormNewWrapper";
import CustomButton from "../../UI/CustomButton/CustomButton";
import LockOutImg from "ASSETS/images/SignalTradingLandingPage/LockOut.svg";

const LockedOutScreen = () => {
  const { state } = useContext(OrderFormContext);
  const dispatch = useDispatch();
  const selectedSymbol = useSelector((state) => state.selectSymbol.selectedSymbol);
  const followedAnalystId = useSelector((state) => state.SignalTrading.analystIdIfAFollower);
  const { userType, analystId } = useSelector((state) => state.SignalTrading.userPersonna);
  const liveSignalsForFollower = useSelector((state) => {
    return state.SignalTrading.liveSignalsForFollowers?.data?.find((signal) => signal.signalData.symbol === selectedSymbol.toUpperCase());
  });
  const liveSignalsForAnalyst = useSelector((state) => state.SignalTrading.completedSignalsIfAnAnalyst?.data?.length > 0);

  /// why this call

  const [showLockScree, setShowLockScreen] = useState(false);

  useEffect(() => {
    if ((userType === "FOLLOWER" && liveSignalsForFollower) || (userType === "ANALYST" && state.isSignalTrading && liveSignalsForAnalyst)) {
      setShowLockScreen(true);
    } else {
      setShowLockScreen(false);
    }
  }, [userType, liveSignalsForAnalyst, liveSignalsForFollower, state.isSignalTrading]);

  useEffect(() => {
    if (userType === "FOLLOWER") {
      dispatch(fetchSignalListForFollowers(followedAnalystId, null, 1, null, null, null, "LIVE", null));
    } else if (userType === "ANALYST") {
      dispatch(fetchSignalListForAnAnalyst(null, analystId, null, 1, null, null, null, ["PUBLISHED", "TRIGGERED"], selectedSymbol.toUpperCase()));
    }
  }, [userType, selectedSymbol]);
  return (
    <Box
      sx={{
        display: showLockScree ? "flex" : "none",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 2,
        position: "absolute",
        height: "100%",
        left: 0,
        top: 0,
        borderBottomRightRadius: "8px",
        borderBottomLeftRadius: "8px",
        zIndex: 1300,
        border: "0.5px solid var(--neutrals-grey-4, #383840)",
        background: "rgba(0, 0, 0, 0.60)",
        backdropFilter: "blur(5px)",
        p: 2
      }}
    >
      <Box component={"img"} src={LockOutImg} height={"100px"} />
      <Typography variant="Bold_32">{"Locked Out"}</Typography>
      {userType === "FOLLOWER" && (
        <>
          <Typography variant="Medium_12">{`You have pending Live Signals for ${selectedSymbol}. Trading yourself might impact the signal performance. Please place at your own risk.`}</Typography>
          <CustomButton label={"Okay"} onClick={() => setShowLockScreen(false)} />
        </>
      )}

      {userType === "ANALYST" && <Typography>{`You have pending Live Signals for ${selectedSymbol}. You can only generate a signal for ${selectedSymbol} once they are completed`}</Typography>}
    </Box>
  );
};

export default LockedOutScreen;
