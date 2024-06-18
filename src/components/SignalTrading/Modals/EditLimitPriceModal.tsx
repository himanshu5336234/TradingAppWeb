import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, InputAdornment } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import OrderDetails from "./OrderDetails";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
// import LTPNumber from "@/components/CustomModals/LTPNumber"
// import { useSelector } from "react-redux";
import { _24hrTicker } from "@/frontend-api-service/Api";
import { useSelector } from "react-redux";
interface UpdateLimitPriceModalProps {
  IsOpen: boolean;
  setShowLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
  symbol: string;
  limitPrice: number;
  currentLimitPrice: number;
  currentTriggerPrice?: number;
  setLimitPrice: Function;
  primaryAction: Function;
  side: string;
  type: string;
  slPrice: number;
  tpPrice: number;
}

const UpdateLimitPriceModal: React.FC<UpdateLimitPriceModalProps> = ({
  IsOpen,
  setShowLimitModal,
  symbol,
  limitPrice,
  setLimitPrice,
  primaryAction,
  side,
  currentLimitPrice,
  currentTriggerPrice,
  type,
  slPrice,
  tpPrice
}) => {
  const [lastTradedPrice, setLastTradedPrice] = useState("");
  const handleLastPriceClick = () => {
    if (lastTradedPrice) {
      setLimitPrice(Number(lastTradedPrice));
    }
  };

  const [error, setError] = useState("");

  const handlePrimaryClick = () => {
    const diff = (parseFloat(lastTradedPrice) * 0.1) / 100;
    if (side === "SELL" || side === "SHORT") {
      if (limitPrice < tpPrice) {
        setError(`Limit Price can not be lesser than ${tpPrice}`);
        return;
      }
      if (limitPrice > slPrice) {
        setError(`Limit Price can not be greater than ${slPrice}`);
        return;
      }
    } else {
      if (limitPrice > tpPrice) {
        setError(`Limit Price can not be greater than ${tpPrice}`);
        return;
      }
      if (limitPrice < slPrice) {
        setError(`Limit Price can not be lesser than ${slPrice}`);
        return;
      }
    }
    if (type === "LIMIT") {
      if (side === "BUY" || side === "LONG") {
        const newLTP = parseFloat(lastTradedPrice) - diff;
        if (newLTP <= limitPrice) {
          setError(`Can't place signal as it will be automatically triggered at current market price. Limit price must be lesser than ${newLTP}`);
          return;
        } else primaryAction();
      } else {
        const newLTP = parseFloat(lastTradedPrice) + diff;
        if (newLTP >= limitPrice) {
          setError(`Can't place signal as it will be automatically triggered at current market price. Limit price must be greater than ${newLTP}`);
          return;
        } else primaryAction();
      }
    } else primaryAction();
  };

  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbolDetails = tradableSymbolList?.filter((listedSymbol: any) => listedSymbol.symbol.toUpperCase() === symbol.toUpperCase());
  const pricePrecisionValue = selectedSymbolDetails[0]?.pricePrecision;
  useEffect(() => {
    _24hrTicker(symbol).then((res: any) => {
      setLastTradedPrice(res.data.lastPrice);
    });
  }, [symbol]);

  const convertToPrecisionValueInPricePrecisionUnit = useCallback(
    (value: string) => {
      return Math.round(parseFloat(value) * Math.pow(10, pricePrecisionValue)) / Math.pow(10, pricePrecisionValue);
    },
    [pricePrecisionValue]
  );
  const handlePriceChange = (event: any) => {
    const value = event.target.value;
    setError("");
    setLimitPrice(convertToPrecisionValueInPricePrecisionUnit(value));
  };

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowLimitModal(false)}
      isPrimaryAction={true}
      primaryName={"Confirm"}
      isSecondaryAction={true}
      secondaryName={"Cancel"}
      primaryAction={handlePrimaryClick}
      secondaryAction={() => setShowLimitModal(false)}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"} component={"div"} mb={3}>
          {"Edit Limit Price"}
        </Typography>
        <OrderDetails symbol={symbol} limitPrice={currentLimitPrice} triggerPrice={currentTriggerPrice} side={side} modalType={"LIMIT_PRICE"} />
        <Box mt={1}>
          <BasicTextFields
            value={limitPrice}
            type="number"
            placeholder={"0.00"}
            onChange={handlePriceChange}
            label={"Limit Price"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <>
                    <Typography onClick={handleLastPriceClick} component="p" variant="Bold_12" sx={{ mr: 1, cursor: "pointer" }}>
                      Last
                    </Typography>
                  </>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="Regular_10" color="text.error">
            {error}
          </Typography>
          <Box
            mt={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="SemiBold_11" color={"text.secondary"}>
              {"LAST TRADED PRICE"}
            </Typography>

            <Typography id="Last-Price" component={"p"} textAlign={"center"} variant={"SemiBold_11"}>
              {Number(lastTradedPrice)?.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default UpdateLimitPriceModal;
