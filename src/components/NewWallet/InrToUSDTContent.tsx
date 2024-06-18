import React from "react";
import { Grid, InputAdornment, Box } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import arrow from "@/assets/images/Walletimages/DownArrow.svg";
import { STATUS_BODY_CONTAINER } from "../SignalTrading/Modals/Modals.styles";
import successIcon from "../../assets/images/SnackbarImages/Success.svg";
import WarningModalWallet from "./WarnignModal";
import TextView from "../UI/TextView/TextView";
interface INRProps {
  amountInInr: string;
  amountInUsdt: string;
  fiatBalance: string;
}
interface ComponentProps {
  INRConversionAmount: INRProps;
  handleMaxClickForInr: (val: string) => void;
  INRtoUSDT: (val: string) => void;
  activeStep: string;
  INRConversionHelperText: string;
  fiatExchangeRateForUSDT: number;
}

const InrToUSDTContent: React.FC<ComponentProps> = ({
  INRConversionAmount,
  handleMaxClickForInr,
  INRtoUSDT,
  activeStep,
  INRConversionHelperText,
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
            <TextView component={"p"} variant="Regular_14" color={"text.regular"} text={"Congratulations! You have received "}>
              <TextView component={"span"} variant={"Regular_14"} style={{ color: "text.main" }} text={INRConversionAmount?.amountInUsdt}></TextView> USDT in your USDT wallet
            </TextView>
          </Box>
        );
      case "confirm":
        return (
          <WarningModalWallet
            heading={"Are You Sure"}
            currentCurrency={"USDT"}
            amountToConvert={INRConversionAmount?.amountInUsdt}
            covertedAmount={INRConversionAmount?.amountInInr}
            fiatExchangeRateForUSDT={fiatExchangeRateForUSDT}
          />
        );
      default:
        return (
          <Grid container mt={4} gap={1}>
            <Grid item xs={12}>
              <BasicTextFields
                // Error={inrError.length > 0}
                label={"INR"}
                backgroundColor={"background.default"}
                type={"number"}
                value={INRConversionAmount?.amountInInr}
                placeholder={"0.00"}
                onChange={(event) => INRtoUSDT(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <>
                        <TextView component="p" variant="Bold_12" style={{ cursor: "pointer" }} onClick={() => handleMaxClickForInr(INRConversionAmount?.fiatBalance)} text={"Max"}></TextView>
                      </>
                    </InputAdornment>
                  )
                }}
              />
              <TextView component={"p"} style={{ mt: 1 }} variant="Regular_14" color={"text.error"} text={INRConversionHelperText}></TextView>
            </Grid>

            <Grid item container justifyContent={"center"}>
              <Grid container item xs={12} justifyContent={"space-between"}>
                <TextView color={"text.regular"} variant="Medium_11" text={"Available Balance"}></TextView>
                <TextView variant="Medium_11" text={`₹ ${Number(INRConversionAmount?.fiatBalance)?.toFixed(2)}`}>
                  {/* <TextView component={"span"} color={"text.main"} variant="Medium_11">{fiatExchangeRateForUSDT}{" INR"}</TextView> */}
                </TextView>
              </Grid>

              <Box sx={{ borderRadius: "50%", px: 1, py: 0.5, backgroundColor: "background.secondary" }} my={1} component={"img"} src={arrow} />
            </Grid>

            <Grid item xs={12}>
              <BasicTextFields label={"USDT"} backgroundColor={"background.default"} type={"number"} value={INRConversionAmount?.amountInUsdt} placeholder={"0.00"} disabled={true} />
            </Grid>
            <Grid container item xs={12} justifyContent={"space-between"}>
              <TextView color={"text.regular"} variant="Medium_11" text={"Real time rate"} />
              <TextView text={"1 USDT = "} variant={"Medium_12"}>
                <TextView component={"span"} text={`${fiatExchangeRateForUSDT} INR`} color={"text.main"} />
              </TextView>
            </Grid>
          </Grid>
        );
    }
  };
  return <>{getContent()}</>;
};

export default InrToUSDTContent;
