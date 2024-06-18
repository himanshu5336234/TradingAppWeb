import React from "react";
import { Grid, InputAdornment, Box } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import arrow from "../../assets/images/Walletimages/DownArrow.svg";
import { STATUS_BODY_CONTAINER } from "../SignalTrading/Modals/Modals.styles";
import successIcon from "../../assets/images/SnackbarImages/Success.svg";
import WarningModalWallet from "./WarnignModal";
import TextView from "../UI/TextView/TextView";

interface USDTProps {
  amountInUsdt: string;
  amountInInr: string;
  freeMarginBalance: number;
  TDS: number;
  OTP: string;
  getAmount: number;
}
interface ComponentProps {
  USDTConversionAmount: USDTProps;
  handleMaxClickForUsdt: (val: number) => void;
  USDTTOINR: (val: number) => void;
  activeStep: string;
  USDTConversionHelperText: string;
  fiatExchangeRateForUSDT: number;
}

const UsdtToInrContent: React.FC<ComponentProps> = ({
  USDTTOINR,
  handleMaxClickForUsdt,
  USDTConversionAmount,
  activeStep,
  USDTConversionHelperText,
  fiatExchangeRateForUSDT
  // ,INRConversionHelperText
}) => {
  const getContent = () => {
    switch (activeStep) {
      case "success":
        return (
          <Box sx={STATUS_BODY_CONTAINER}>
            <img src={successIcon} width={"64px"} />
            <TextView variant="Medium_20" text={"Success"}></TextView>
            <TextView component={"p"} style={{ mb: 3 }} color={"text.regular"} variant={"Regular_14"}>
              Congratulations! you have successfully received
              <TextView component={"span"} style={{ color: "text.main" }} variant={"Regular_14"}>
                {" ₹"}
                {USDTConversionAmount?.amountInInr}
              </TextView>{" "}
              in your INR wallet, and a TDS(Tax Deducted at Source) of
              <TextView component={"span"} style={{ color: "text.main" }} variant={"Regular_14"}>
                {" ₹"}
                {USDTConversionAmount?.TDS.toPrecision(3)}
              </TextView>{" "}
              has been deducted from the amount
            </TextView>
          </Box>
        );
      case "confirm":
        return (
          <WarningModalWallet
            heading={"Are You Sure"}
            currentCurrency={"USDT"}
            amountToConvert={USDTConversionAmount?.amountInUsdt}
            covertedAmount={USDTConversionAmount?.amountInInr}
            fiatExchangeRateForUSDT={fiatExchangeRateForUSDT}
          />
        );
      default:
        return (
          <Grid container mt={4} gap={1}>
            <Grid item xs={12}>
              <BasicTextFields
                // Error={inrError.length > 0}
                label={"USDT"}
                backgroundColor={"background.default"}
                type={"number"}
                value={USDTConversionAmount?.amountInUsdt}
                placeholder={"0.00"}
                onChange={(event) => USDTTOINR(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <>
                        <TextView component="p" variant="Bold_12" style={{ cursor: "pointer" }} onClick={() => handleMaxClickForUsdt(USDTConversionAmount?.freeMarginBalance)} text={"Max"}></TextView>
                      </>
                    </InputAdornment>
                  )
                }}
              />
              <TextView component={"p"} style={{ mt: 1 }} variant="Regular_14" color={"text.error"} text={USDTConversionHelperText}></TextView>
            </Grid>

            <Grid item container justifyContent={"center"}>
              <Grid container item xs={12} justifyContent={"space-between"}>
                <TextView color={"text.regular"} variant="Medium_11" text={"Available Balance"}></TextView>
                <TextView variant="Medium_11" text={`${Math.trunc(USDTConversionAmount?.freeMarginBalance * 100) / 100} USDT`}>
                  {/* <TextView component={"span"} color={"text.main"} variant="Medium_11">{fiatExchangeRateForUSDT}{" INR"}</TextView> */}
                </TextView>
              </Grid>
              <Box sx={{ borderRadius: "50%", px: 1, py: 0.5, backgroundColor: "background.secondary" }} my={1} component={"img"} src={arrow} />
            </Grid>

            <Grid item xs={12}>
              <BasicTextFields label={"INR"} backgroundColor={"background.default"} type={"number"} value={USDTConversionAmount?.amountInInr} placeholder={"0.00"} disabled={true} />
            </Grid>
            <Grid container item xs={12} justifyContent={"space-between"}>
              <TextView color={"text.regular"} variant="Medium_11" text={"Real time rate"} />
              <TextView text={"1 USDT = "} variant={"Medium_12"}>
                <TextView component={"span"} text={`${fiatExchangeRateForUSDT} INR`} color={"text.main"} />
              </TextView>
            </Grid>
            <Grid mt={0} container item xs={12} justifyContent={"flex-end"}>
              <TextView variant={"Medium_11"} text={"TDS = 1%"} />
            </Grid>
          </Grid>
        );
    }
  };

  return <>{getContent()}</>;
};

export default UsdtToInrContent;
