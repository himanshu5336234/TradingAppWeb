import { Grid } from "@mui/material";
import { UTCToDateConvertor } from "@/helpers";
import TextView from "@/components/UI/TextView/TextView";

import Sparkle from "@/assets/icons/Sparkle.svg";
import React from "react";

interface ReferralRewardHistoryTableRowProps {
  date: string;
  reward: string;
  status: string;
  index: number;
}

export const DEFAULT_TAB_STYLES_ACTIVE = {
  width: "68px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  display: "flex",
  px: "8px",
  py: "2px",
  fontWeight: 600,
  textTransform: "capitalize",
  backgroundColor: "background.tertiary"
};

export const DEFAULT_TAB_STYLES_EXPIRED = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  display: "flex",
  px: "8px",
  py: "2px",
  fontWeight: 600,
  textTransform: "capitalize",
  backgroundColor: "background.tertiary",
  color: "text.quaternary"
};

export const ReferralRewardHistoryTableRow: React.FC<ReferralRewardHistoryTableRowProps> = ({ date, reward, status, index }) => {
  return (
    <Grid container p={"1rem 1.5rem 1rem 1.5rem"} sx={index % 2 === 0 ? { borderRadius: "8px", backgroundColor: "background.default" } : { borderRadius: "8px", background: "rgba(27, 27, 31, 0.60)" }}>
      <Grid xs={4}>
        <TextView variant={"Regular_12"} text={UTCToDateConvertor(date)?.split(",")[0]} color={"text.regular"} />
      </Grid>
      <Grid xs={4}>
        <TextView variant={"Regular_12"} text={Number(reward)?.toFixed(3)} />
      </Grid>
      <Grid xs={4} sx={status?.toLocaleLowerCase() === "rewarded" ? DEFAULT_TAB_STYLES_ACTIVE : DEFAULT_TAB_STYLES_EXPIRED}>
        {status?.toLocaleLowerCase() === "rewarded" && <img src={Sparkle} height={"8px"} width={"8px"} />}
        <TextView style={{ marginLeft: "5px" }} variant={"Regular_12"} text={status} />
      </Grid>
    </Grid>
  );
};
