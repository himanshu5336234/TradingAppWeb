import { Grid } from "@mui/material";

import { UTCToDateConvertor } from "@/helpers";

import TextView from "@/components/UI/TextView/TextView";
import React from "react";

interface RebateHistoryTableRowProps {
  date: string;
  rebateCashback: string;
  rebateRate: string;
  fee: string;
  status: string;
  index: number;
}

const SUCCESS_TAB_STYLES = {
  backgroundColor: "text.success",
  width: "68px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
  display: "flex",
  px: "8px",
  py: "2px",
  fontWeight: 600,
  textTransform: "capitalize"
};

const PENDING_TAB_STYLES = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "#EBB62F",
  color: "#0E0E0F"
};

export const ERROR_TAB_STYLES = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "background.error.primary"
};

export const DEFAULT_TAB_STYLES_ACTIVE = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "background.tertiary"
};

export const RebateHistoryTableRow: React.FC<RebateHistoryTableRowProps> = ({ date, rebateCashback, rebateRate, fee, status, index }) => {
  const ReturnStatusStyles = {
    pending: PENDING_TAB_STYLES,
    rewarded: SUCCESS_TAB_STYLES,
    failed: ERROR_TAB_STYLES
  };

  return (
    <Grid container p={"1rem 1.5rem 1rem 1.5rem"} sx={index % 2 === 0 ? { borderRadius: "8px", backgroundColor: "background.default" } : { borderRadius: "8px", background: "rgba(27, 27, 31, 0.60)" }}>
      <Grid xs={2.4}>
        <TextView variant={"Regular_12"} text={UTCToDateConvertor(date)?.split(",")[0]} color={"text.regular"} />
      </Grid>
      <Grid xs={2.4}>
        <TextView variant={"Regular_12"} text={Number(rebateCashback)?.toFixed(3)} />
      </Grid>
      <Grid xs={2.4}>
        <TextView style={DEFAULT_TAB_STYLES_ACTIVE} variant={"Regular_12"} text={rebateRate + "%"} />
      </Grid>
      <Grid xs={2.4}>
        <TextView variant={"Regular_12"} text={Number(fee)?.toFixed(3)} />
      </Grid>
      <Grid xs={2.4}>
        <TextView style={ReturnStatusStyles[status?.toLocaleLowerCase()]} variant={"Regular_12"} text={status} />
      </Grid>
    </Grid>
  );
};
