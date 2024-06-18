import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { justifyGridSx, CHILD_ORDERS_CONTAINER } from "@/components/SignalTrading/Modals/Modals.styles";
import BuySellTab from "@/components/SignalTrading/BuySellTab";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import EditIcon from "../../../../../assets/images/EditSquare.svg";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useOtOCOForOpenOrders } from "@/frontend-BL/businessHooks/ORDER_FORM/useOTOCOForOpenOrders";
import TextView from "@/components/UI/TextView/TextView";
interface Data {
  stopPrice: string;
  ID: string;
}

interface ParentData {
  side: "BUY" | "SELL";
  quantity: string;
  stopPrice: string;
  type: string;
  price: string;
  averagePrice: string;
  symbol: string;
}
interface ChildOrdersProps {
  type: "TP" | "SL";
  gridSize: number;
  parentData: ParentData;
  data: Data;
  close: () => Function;
}
const ChildOrders: React.FC<ChildOrdersProps> = ({ type, gridSize, parentData, data, close }) => {
  const {
    priceError: error,
    handleCheckClick,
    updatePrice: updatedPrice,
    setUpdatePrice: setUpdatedPrice,
    setPriceError: setError,
    handleChangeUpdatedPrice,
    convertToPrecisionValueInContractAssetUnit,
    symbolPricePrecision,
    getEstimatedPnL,
    setShowEditTPButton: setshowEditTriggerPriceBox,
    showEditTPButton: showEditTriggerPriceBox
  } = useOtOCOForOpenOrders({ data, parentData, childOrderType: type === "SL" ? "STOP_MARKET" : "TAKE_PROFIT_MARKET", close });
  useEffect(() => {
    setUpdatedPrice(String(data?.stopPrice));
  }, [data.stopPrice]);

  const handleClose = () => {
    setUpdatedPrice(convertToPrecisionValueInContractAssetUnit(String(data.stopPrice), Number(symbolPricePrecision)));
    setshowEditTriggerPriceBox(false);
    setError("");
  };
  return (
    <Grid
      xs={gridSize}
      sx={{
        ...CHILD_ORDERS_CONTAINER,
        background:
          type === "TP"
            ? "linear-gradient(179deg, rgba(41, 181, 126, 0.40) -389.3%, rgba(41, 181, 126, 0.00) 126.66%)"
            : "linear-gradient(180deg, rgba(255, 101, 84, 0.40) -252.71%, rgba(254, 101, 84, 0.00) 124.85%)"
      }}
    >
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <TextView variant="Medium_14">{type === "TP" ? "Take Profit" : "Stop Loss"}</TextView>
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <TextView color={"text.secondary"} variant="Regular_14">
          Side
        </TextView>
        {parentData.side === "SELL" ? <BuySellTab side={"BUY"} /> : <BuySellTab side={"SELL"} />}
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <TextView color={"text.secondary"} variant="Regular_14">
          Size
        </TextView>
        <TextView id="Take-Profit-triggerPrice" variant="SemiBold_12">
          {parentData.quantity}
        </TextView>
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <TextView color={"text.secondary"} variant="Regular_14">
          {"Trigger Price (USDT)"}
        </TextView>

        {!showEditTriggerPriceBox && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextView id="Take-Profit-triggerPrice" variant="SemiBold_12">
              {data.stopPrice}
            </TextView>
            <img src={EditIcon} onClick={() => setshowEditTriggerPriceBox(true)} alt="Edit Icon" style={{ marginLeft: "4px", width: "14px !important", cursor: "pointer", marginBottom: "2px" }} />
          </Box>
        )}
        {showEditTriggerPriceBox && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", width: "45%" }}>
              <BasicTextFields
                type={"number"}
                value={updatedPrice}
                inputProps={{
                  id: "openOrderModal-Updte-Trigger-Price-Field",
                  style: {
                    fontSize: "14px"
                  }
                }}
                onChange={handleChangeUpdatedPrice}
              />
              <CloseIcon id="openOrderModal-Close-BTN" onClick={handleClose} style={{ marginLeft: "8px", cursor: "pointer", fontSize: "14px" }} />
              <CheckIcon id="openOrderModal-Right-Btn" onClick={handleCheckClick} style={{ marginLeft: "8px", cursor: !error && "pointer", fontSize: "14px", color: error ? "gray" : "#E2FF6F" }} />
            </Box>
            {error && (
              <TextView component={"div"} variant="Medium_12" color={"text.error"}>
                {error}
              </TextView>
            )}
          </>
        )}
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <TextView color={"text.secondary"} variant="Regular_14">
          Estimated P&L
        </TextView>
        <TextView id="Take-Profit-EST-PnL" variant="SemiBold_12" color={type === "TP" ? "text.success" : "text.error"}>
          {getEstimatedPnL()}
        </TextView>
      </Grid>
    </Grid>
  );
};

export default ChildOrders;
