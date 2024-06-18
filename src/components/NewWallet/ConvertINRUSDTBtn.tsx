import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import convert from "../../assets/images/Walletimages/convert.svg";
import { useDispatch } from "react-redux";
import { fiatExchangeRateApi } from "../../frontend-api-service/Api";
import { showSnackBar } from "../../frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import ConvertUSDTINRModal from "./ConvertUSDTINRModal";
import { CONVERT_BUTTON_BOX } from "./styles";
import TextView from "../UI/TextView/TextView";
interface ErrorResponse {
  errorResponse: {
    response: {
      data: {
        details: string;
      };
    };
  };
}

const ConvertINRUSDTBtn = ({ IsUserVerified }: { IsUserVerified: boolean }) => {
  const [fiatExchangeRateForUSDT, setConversionRateForUSDT] = useState("");
  const [showConverstionModal, setShowConversionModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fiatExchangeRateApi()
      .then((successResponse: any) => {
        setConversionRateForUSDT(successResponse.data.inr);
      })
      .catch((errorResponse: ErrorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_FIAT_EXCHANGE_RATE_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  }, []);
  return (
    <Box sx={CONVERT_BUTTON_BOX} mt={2}>
      <Button disabled={!IsUserVerified} variant="secondary" sx={{ height: "44px", px: 8, py: 1 }} onClick={() => setShowConversionModal(true)}>
        <img src={convert} width={"24px"} />
        <TextView style={{ ml: 2 }} variant="Bold_16" text={"Convert INR-USDT"}></TextView>
      </Button>
      <TextView style={{ mt: 1 }} text={"1 USDT = "} variant={"Medium_12"}>
        <TextView component={"span"} text={`${fiatExchangeRateForUSDT} INR`} color={"text.main"} />
      </TextView>
      {showConverstionModal && <ConvertUSDTINRModal IsOpen={showConverstionModal} setShowConversionModal={setShowConversionModal} fiatExchangeRateForUSDT={fiatExchangeRateForUSDT} />}
    </Box>
  );
};

export default ConvertINRUSDTBtn;
