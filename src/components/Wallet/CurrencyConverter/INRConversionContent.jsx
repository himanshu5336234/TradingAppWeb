import { Avatar, Box, InputAdornment, Typography } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React from "react";
import { STEP_MAIN } from "../Deposit/Content/styles";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import PropTypes from "prop-types";
import { AVATAR_ICON, RUPEE_LOGO } from "../withdraw/styles";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { ALERT_MODAL_WRAPPER, COLUMN_CENTER, GAP, PRIORITY_ICON, PRIORITY_ICON_BG } from "@/components/UserVerification/BankVerification/styles";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { SWAP_ICON_STYLE } from "./styles";

const INRConversionContent = ({ INRConversionAmount, conversionRateforUSDT, handleMaxClickForInr, INRtoUSDT, showINRConversionStep, INRConversionHelperText, handleAddFunds }) => {
  if (showINRConversionStep === "success") {
    return (
      <>
        <Box sx={{ textAlign: "center", width: "80%", mx: "auto", mb: 3, minHeight: 100 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", mb: 3 }}>
            <CheckCircleRoundedIcon sx={{ fontSize: "35px", marginBottom: "4px", color: "#27BD67" }} />
            <Typography component={"h1"} variant={"SemiBold_28"}>
              {"Success"}
            </Typography>
          </Box>
          <Typography component={"p"}>
            Congratulations! You have received
            <Typography component={"span"} sx={{ color: "text.main" }}>
              {" "}
              {INRConversionAmount?.amountInUsdt}
            </Typography>{" "}
            USDT in your USDT wallet
          </Typography>
        </Box>
      </>
    );
  } else if (showINRConversionStep === "confirm") {
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
                  &nbsp;{INRConversionAmount?.amountInInr}&nbsp;
                </Typography>
                {"INR for"}
                <Typography component={"span"} color="text.main">
                  &nbsp;{INRConversionAmount?.amountInUsdt}&nbsp;
                </Typography>
                {"USDT at a rate of"}
                <Typography component={"span"} color="text.main">
                  &nbsp; {Math.trunc(conversionRateforUSDT * 100) / 100}&nbsp;
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
      <>
        <Box sx={STEP_MAIN}>
          <Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={[RUPEE_LOGO, { border: "1px solid #4f4f4f" }]}>
                  <Avatar sx={AVATAR_ICON}>
                    <CurrencyRupeeIcon sx={{ fontSize: "small" }} />
                  </Avatar>
                  <Typography color="text.primary" component="h3">
                    {"INR"}
                  </Typography>
                </Box>
                <BasicTextFields
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" disableTypography>
                        <span style={{ cursor: "pointer" }} onClick={() => handleMaxClickForInr(INRConversionAmount?.fiatBalance)}>
                          MAX
                        </span>
                      </InputAdornment>
                    )
                  }}
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
                  variant="outlined"
                  size="medium"
                  fullWidth
                  type={"number"}
                  maxLength={6}
                  placeholder="Enter Amount"
                  value={INRConversionAmount?.amountInInr}
                  onChange={(event) => INRtoUSDT(event.target.value)}
                />
              </Box>
              <Typography variant="Regular_12_KYC" component={"p"} sx={{ color: "#E55B4C" }}>
                {INRConversionHelperText}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>
                  {"Available:"}
                  <Typography component={"span"} color="text.main">
                    {" "}
                    {INRConversionAmount?.fiatBalance}
                  </Typography>
                  {" INR"}
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
                  <img src={getCurrencyUrl("usdt")} alt={""} style={{ width: "20px", marginTop: "-5px" }} />
                  <Typography sx={{ color: "text.primary" }} component="h3">
                    USDT
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
                  // onChange={(event) => USDtoINR(event.target.value)}
                  value={INRConversionAmount?.amountInUsdt}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  type={"number"}
                  maxLength={6}
                />
              </Box>
              <Typography>
                {"1 USDT "}=
                <Typography component={"span"} color="text.main">
                  {" "}
                  {Math.trunc(conversionRateforUSDT * 100) / 100}
                </Typography>
                {" INR ( Real time rate )"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
};
INRConversionContent.propTypes = {
  INRConversionAmount: PropTypes.object,
  conversionRateforUSDT: PropTypes.number,
  handleMaxClickForInr: PropTypes.func,
  INRtoUSDT: PropTypes.func,
  INRConversionHelperText: PropTypes.string,
  showINRConversionStep: PropTypes.string,
  handleAddFunds: PropTypes.func
};
export default INRConversionContent;
