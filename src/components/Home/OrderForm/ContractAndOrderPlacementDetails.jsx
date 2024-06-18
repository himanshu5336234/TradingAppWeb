import React, { useMemo, useContext } from "react";
import { Grid, Typography, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import { Margin_Ratio } from "@/assets/strings/tooltip.string";
import { MINSIZEVALUE } from "./style";
import { ORDERFORM_CONSTANTS } from "../../../frontend-BL/businessHooks/ORDER_FORM/Constants/Orderform_const";
import OrderFormContext from "./OrderFormNewWrapper";
import { numberWithCommas } from "@/helpers/commaHelper";

const ContractAndOrderPlacementDetails = ({ settlementCurrencyType }) => {
  const { state } = useContext(OrderFormContext);
  const marginUsedMemoized = useMemo(() => {
    return (
      <Grid container item sx={{ mt: 1 }} id="tradingFeeContainer" display="flex" alignItems="center">
        <Grid xs={5} item display="flex">
          <Typography variant={"Regular_11"} color={"text.mild"} sx={{ display: "flex", alignItems: "center" }}>
            {ORDERFORM_CONSTANTS.MARGIN_USED_LABEL}
            <Tooltip title={Margin_Ratio} placement="top-start">
              <InfoIcon sx={{ fontSize: "small", ml: "5px", color: "#A9A9A9" }}></InfoIcon>
            </Tooltip>
          </Typography>
        </Grid>
        <Grid xs={7} item>
          <Typography id="orderForm-marginused" variant={"Medium_12"} sx={MINSIZEVALUE}>
            {(numberWithCommas(Math.trunc(state.costValue * 100) / 100) || 0) + " "}
            <Typography color="text.mild" variant={"Regular_11"} component={"span"}>
              {" USDT"}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    );
  }, [state.costValue?.toFixed(3), settlementCurrencyType]);

  return <Grid container>{marginUsedMemoized}</Grid>;
};

ContractAndOrderPlacementDetails.propTypes = {
  settlementCurrencyType: PropTypes.string
};

export default React.memo(ContractAndOrderPlacementDetails);
