import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModals/newModal/CustomModal";
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { numberWithCommas } from "@/helpers/commaHelper";
import { getPortfolioCommisions } from "../../frontend-api-service/Api/NewPortfolio/Portfolio";

interface FeeDetailsObject {
  tradingCommission: number;
  fundingFee: number;
  insuranceClearFee: number;
  totalFee: number;
}
const FeeTitle = ({ title, tooltipText, position = "top" }: { title: string; tooltipText: string; position: any }) => {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            color: "text.quaternary",
            fontSize: "11px",
            backgroundColor: "background.tertiary",
            fontWeight: 600,
            p: "8px",
            maxWidth: 200
          }
        }
      }}
      title={tooltipText}
      arrow
      placement={position}
    >
      <Typography variant="Medium_11" color={"text.quaternary"} component={"p"}>
        {title}
      </Typography>
    </Tooltip>
  );
};
const FeeBreakdownModal = ({
  showFeeBreakDown,
  setShowFeeBreakDown,
  dateRange,
  refreshState
}: {
  showFeeBreakDown: boolean;
  setShowFeeBreakDown: Function;
  dateRange: { from: number; to: number };
  refreshState: boolean;
}) => {
  const [feeObject, setFeeObject] = useState<FeeDetailsObject>({
    tradingCommission: 0,
    fundingFee: 0,
    insuranceClearFee: 0,
    totalFee: 0
  });

  const getFeeBreakdown = async () => {
    const apiResponse = await getPortfolioCommisions({ startTime: dateRange.from, endTime: dateRange.to });
    const data = apiResponse.data;
    setFeeObject(data);
  };

  useEffect(() => {
    getFeeBreakdown();
  }, [dateRange, refreshState]);
  return (
    <CustomModal IsOpen={showFeeBreakDown} close={() => setShowFeeBreakDown(false)} isClose={true} title={"Total Fee Summary"} ContainerSx={{ maxWidth: { xs: "430px" } }}>
      <Box px={1} pt={3}>
        <Grid container mb={10}>
          <Grid item sx={{ backgroundColor: "background.default" }} xs={12} border={"1px solid #29292E"} py={2} px={1.8} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <FeeTitle title={"Trading Commission"} position="top" tooltipText={"Trading commission paid based on maker and taker fee"} />
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(feeObject?.tradingCommission?.toFixed(2))}
              {" USDT"}
            </Typography>
          </Grid>
          <Grid item sx={{ backgroundColor: "background.default" }} xs={12} border={"1px solid #29292E"} py={2} px={1.8} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <FeeTitle
              title={"Funding Fee"}
              position="right"
              tooltipText={
                "Feature of perpetual contracts where payment is exchanged between long and short position holders.  If the funding rate is positive, longs pay shorts. If negative, shorts pay longs."
              }
            />
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(feeObject?.fundingFee?.toFixed(2))}
              {" USDT"}
            </Typography>
          </Grid>
          <Grid item sx={{ backgroundColor: "background.default" }} xs={12} border={"1px solid #29292E"} py={2} px={1.8} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <FeeTitle title={"Liquidation Fee"} position="bottom" tooltipText={"Fee charged if the position of the user gets liquidated on breach of maintenance margin"} />
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(feeObject?.insuranceClearFee?.toFixed(2))}
              {" USDT"}
            </Typography>
          </Grid>
          <Grid item sx={{ backgroundColor: "background.secondary" }} xs={12} py={3} px={1.8} display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
            <Typography variant="Medium_11">{"Total Fee"}</Typography>
            <Typography color={"#fff"} component={"div"} variant="Medium_12">
              {numberWithCommas(feeObject?.totalFee?.toFixed(2))}
              {" USDT"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CustomModal>
  );
};

export default FeeBreakdownModal;
