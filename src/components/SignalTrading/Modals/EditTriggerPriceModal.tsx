import React, { useCallback, useEffect, useState } from "react";
import { _24hrTicker } from "@/frontend-api-service/Api";
import { Box, Typography } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import OrderDetails from "./OrderDetails";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import { useSelector } from "react-redux";
interface UpdateTriggerPriceModalProps {
  IsOpen: boolean;
  setShowTriggerModal: React.Dispatch<React.SetStateAction<boolean>>;
  triggerPrice: number;
  setTriggerPrice: Function;
  primaryAction: () => void;
  symbol: string;
  currentLimitPrice: number;
  currentTriggerPrice?: number;
  side: string;
  type: string;
}
const UpdateTriggerPriceModal: React.FC<UpdateTriggerPriceModalProps> = ({
  IsOpen,
  setShowTriggerModal,
  triggerPrice,
  setTriggerPrice,
  primaryAction,
  symbol,
  side,
  currentLimitPrice,
  currentTriggerPrice,
  type
}) => {
  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbolDetails = tradableSymbolList?.filter((listedSymbol: any) => listedSymbol.symbol.toUpperCase() === symbol.toUpperCase());
  const pricePrecisionValue = selectedSymbolDetails[0]?.pricePrecision;
  const [lastTradedPrice, setLastTradedPrice] = useState("");
  useEffect(() => {
    _24hrTicker(symbol).then((res: any) => {
      setLastTradedPrice(res.data.lastPrice);
    });
  }, [symbol]);
  const [error, setError] = useState("");

  const handlePrimaryClick = () => {
    const diff = (parseFloat(lastTradedPrice) * 0.1) / 100;
    if (type === "STOP" || type === "TAKE_PROFIT") {
      const upperBound = convertToPrecisionValueInPricePrecisionUnit(parseFloat(lastTradedPrice) + diff);
      const lowerBound = convertToPrecisionValueInPricePrecisionUnit(parseFloat(lastTradedPrice) - diff);
      if (triggerPrice <= upperBound && triggerPrice >= lowerBound) {
        setError(`Can't place signal as it will be automatically triggered at current market price`);
        return;
      } else primaryAction();
    } else {
      primaryAction();
    }
  };

  const convertToPrecisionValueInPricePrecisionUnit = useCallback(
    (value: any) => {
      return Math.round(parseFloat(value) * Math.pow(10, pricePrecisionValue)) / Math.pow(10, pricePrecisionValue);
    },
    [pricePrecisionValue]
  );

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowTriggerModal(false)}
      isPrimaryAction={true}
      primaryName={"Confirm"}
      isSecondaryAction={true}
      secondaryName={"Cancel"}
      primaryAction={handlePrimaryClick}
      secondaryAction={() => setShowTriggerModal(false)}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"} component={"div"} mb={3}>
          {"Edit Trigger Price"}
        </Typography>
        <OrderDetails symbol={symbol} limitPrice={currentLimitPrice} triggerPrice={currentTriggerPrice} side={side} />
        <Box mt={1}>
          <BasicTextFields
            label={"Trigger Price"}
            type={"number"}
            value={triggerPrice}
            placeholder={"0.00"}
            onChange={(event) => setTriggerPrice(convertToPrecisionValueInPricePrecisionUnit(event.target.value))}
          />
          <Typography variant="Regular_10" color="text.error">
            {error}
          </Typography>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default UpdateTriggerPriceModal;
