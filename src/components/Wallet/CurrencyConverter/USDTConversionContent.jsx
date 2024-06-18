import { Avatar, Box, InputAdornment, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";
import { STEP_MAIN, STEP_TITLE } from "../Deposit/Content/styles";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import PropTypes from "prop-types";
import { AVATAR_ICON, RUPEE_LOGO } from "../withdraw/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import { ALERT_MODAL_WRAPPER, COLUMN_CENTER, GAP, PRIORITY_ICON, PRIORITY_ICON_BG } from "@/components/UserVerification/BankVerification/styles";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { numberWithCommas } from "@/helpers/commaHelper";
import { SWAP_ICON_STYLE } from "./styles";

const USDTConversionContent = ({ USDTTOINR, handleMaxClickForUsdt, showUSDTConversionStep, USDTConversionHelperText, USDTConversionAmount, conversionRateforINR, handleAddFunds }) => {
  // const isMobile = useMediaQuery();
  if (showUSDTConversionStep === "success") {
    return (
      <>
        <Box sx={{ textAlign: "center", width: "90%", mx: "auto", minHeight: 100 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              mb: 3
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: "35px", marginBottom: "4px", color: "#27BD67" }} />
            <Typography component={"h1"} variant={"SemiBold_28"}>
              {"Success"}
            </Typography>
          </Box>

          <Typography component={"p"} sx={{ mb: 3 }}>
            Congratulations! you have successfully received
            <Typography component={"span"} sx={{ color: "text.main" }}>
              {" "}
              {USDTConversionAmount?.amountInInr}
            </Typography>{" "}
            in your INR wallet, and a TDS(Tax Deducted at Source) of
            <Typography component={"span"} sx={{ color: "text.main" }}>
              {" "}
              {USDTConversionAmount?.TDS.toPrecision(3)}
            </Typography>{" "}
            INR has been deducted from the amount
          </Typography>
        </Box>
      </>
    );
  } else if (showUSDTConversionStep === "confirm") {
    return (
      <>
        <Box sx={ALERT_MODAL_WRAPPER}>
          <Box sx={GAP}>
            <Avatar sx={PRIORITY_ICON_BG}>
              <PriorityHighIcon sx={PRIORITY_ICON}></PriorityHighIcon>
            </Avatar>
            <Box sx={COLUMN_CENTER}>
              <Typography variant="SemiBold_28" component={"h1"}>
                {"Are You Sure ?"}
              </Typography>
              <Typography component={"h2"}>
                {"Are you sure you want to proceed with your request to exchange"}
                <Typography component={"span"} color="text.main">
                  &nbsp;{USDTConversionAmount?.amountInUsdt}&nbsp;
                </Typography>
                {"USDT for"}
                <Typography component={"span"} color="text.main">
                  &nbsp;{USDTConversionAmount?.amountInInr}&nbsp;
                </Typography>
                {"INR at a rate of"}
                <Typography component={"span"} color="text.main">
                  &nbsp;{conversionRateforINR.toFixed(2)}&nbsp;
                </Typography>
                {"INR/USDT"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  } else {
    return (
      <Box sx={STEP_MAIN}>
        <Box sx={[STEP_TITLE, { flexDirection: "column" }]}>
          <Box sx={{ width: "100%" }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={[RUPEE_LOGO, { border: "1px solid #4f4f4f" }]}>
                  <img src={getCurrencyUrl("usdt")} alt={""} style={{ width: "20px", marginTop: "-5px" }} />
                  <Typography sx={{ color: "text.primary" }} component="h3">
                    {"USDT"}
                  </Typography>
                </Box>
                <BasicTextFields
                  value={USDTConversionAmount?.amountInUsdt}
                  variant="outlined"
                  styles={{
                    ".MuiInputBase-input": {
                      padding: { xs: "10px", md: "16px" }
                    }
                  }}
                  onFocus={(e) =>
                    e.target.addEventListener(
                      "wheel",
                      function (e) {
                        e.preventDefault();
                      },
                      { passive: false }
                    )
                  }
                  size="medium"
                  fullWidth
                  type={"number"}
                  maxLength={6}
                  placeholder="Enter Amount"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        <span style={{ cursor: "pointer" }} onClick={() => handleMaxClickForUsdt(USDTConversionAmount?.freeMarginBalance)}>
                          MAX
                        </span>
                      </InputAdornment>
                    )
                  }}
                  onChange={(event) => USDTTOINR(event.target.value)}
                />
              </Box>

              <Typography variant="Regular_12_KYC" component={"p"} sx={{ color: "#E55B4C" }}>
                {USDTConversionHelperText}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  Available :{" "}
                  <Typography component={"span"} color="text.main">
                    {Math.trunc(USDTConversionAmount?.freeMarginBalance * 100) / 100}
                  </Typography>{" "}
                  {"USDT"}
                </Typography>
                <Typography sx={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => handleAddFunds()} variant="SemiBold_16">
                  + Add Funds{" "}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <ArrowCircleDownRoundedIcon sx={SWAP_ICON_STYLE} />
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    borderRadius: "2px",
                    height: { xs: "43px", sm: "43px", md: "55px" },
                    width: "111px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    border: "1px solid #4f4f4f",
                    backgroundColor: "#2F2F2F"
                  }}
                >
                  <Avatar sx={AVATAR_ICON}>
                    {" "}
                    <CurrencyRupeeIcon sx={{ fontSize: "small" }} />
                  </Avatar>
                  <Typography sx={{ color: "text.primary" }} component="h3">
                    {"INR"}
                  </Typography>
                </Box>
                <BasicTextFields
                  disabled
                  styles={{
                    ".MuiInputBase-input": {
                      padding: { xs: "10px", md: "16px" }
                    },
                    ".Mui-disabled": {
                      backgroundColor: "#2F2F2F"
                    },
                    ".MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#575756 !important"
                      }
                    }
                  }}
                  value={USDTConversionAmount?.amountInInr}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  type={"number"}
                  maxLength={6}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", sm: "row" }
                }}
              >
                <Typography>
                  {"1 USDT "} ={" "}
                  <Typography component={"span"} color="text.main">
                    {Math.trunc(conversionRateforINR * 100) / 100}
                  </Typography>{" "}
                  {"INR (Real time rate)"}
                </Typography>
                <Typography>
                  {"TDS = "}
                  <Typography component={"span"} color="text.main">
                    {numberWithCommas(Math.trunc(USDTConversionAmount?.TDS * 100) / 100)} {" INR"}
                  </Typography>
                  {" (1%)"}
                </Typography>
              </Box>
              {/* <Typography>
                You will recieve an amount of{" "}
                <Typography component={"span"} color="text.main">
                  {numberWithCommas(Math.trunc(USDTConversionAmount?.getAmount * 100) / 100)}
                </Typography>
                {" INR"}
              </Typography> */}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};
USDTConversionContent.propTypes = {
  USDTTOINR: PropTypes.func,
  handleMaxClickForUsdt: PropTypes.func,
  showUSDTConversionStep: PropTypes.string,
  USDTConversionHelperText: PropTypes.string,
  USDTConversionAmount: PropTypes.object,
  conversionRateforINR: PropTypes.number,
  handleAddFunds: PropTypes.func
};
export default USDTConversionContent;
