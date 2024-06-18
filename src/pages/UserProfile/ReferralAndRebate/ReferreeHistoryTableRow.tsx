import { Grid } from "@mui/material";

import { UTCToDateConvertor } from "@/helpers";

import TextView from "@/components/UI/TextView/TextView";
import React from "react";

interface ReferreeHistoryHistoryTableRowProps {
  date: string;
  kyc: string;
  status: string;
  email: string;
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

export const DEFAULT_TAB_STYLES_EXPIRED = {
  ...SUCCESS_TAB_STYLES,
  backgroundColor: "background.tertiary",
  color: "text.quaternary"
};

export const ReferreeHistoryHistoryTableRow: React.FC<ReferreeHistoryHistoryTableRowProps> = ({ date, kyc, status, email, index }) => {
  const ReturnKYCStyles = {
    pending: PENDING_TAB_STYLES,
    verified: SUCCESS_TAB_STYLES,
    failed: ERROR_TAB_STYLES
  };

  return (
    <Grid container p={"1rem 1.5rem 1rem 1.5rem"} sx={index % 2 === 0 ? { borderRadius: "8px", backgroundColor: "background.default" } : { borderRadius: "8px", background: "rgba(27, 27, 31, 0.60)" }}>
      <Grid xs={2}>
        <TextView variant={"Regular_12"} text={UTCToDateConvertor(date)?.split(",")[0]} color={"text.regular"} />
      </Grid>
      <Grid xs={6}>
        <TextView variant={"Regular_12"} text={email} />
      </Grid>
      <Grid xs={2}>
        <TextView style={ReturnKYCStyles[kyc?.toLocaleLowerCase()]} variant={"Regular_12"} text={kyc} />
      </Grid>
      <Grid xs={2}>
        <TextView style={status?.toLocaleLowerCase() === "active" ? DEFAULT_TAB_STYLES_ACTIVE : DEFAULT_TAB_STYLES_EXPIRED} variant={"Regular_12"} text={status} />
      </Grid>
    </Grid>
  );
};
