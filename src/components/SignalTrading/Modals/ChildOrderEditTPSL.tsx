import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import BuyCellTab from "../BuySellTab";
import EditIcon from "../../../assets/images/EditSquare.svg";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { CHILD_ORDERS_CONTAINER, justifyGridSx } from "./Modals.styles";
import { editASignal } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { useDispatch } from "react-redux";
import { fetchSignalToBeDeleted } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import ActionWarningModal from "./ActionWarningModal";
interface ChildOrdersEditTPSLProps {
  side: string;
  limitPrice: number; // Update with actual type
  symbol?: string;
  type: string;
  triggerPrice: number;
  signalId: string;
  setShowEditTPSLModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchLatestListOfSignalsForAnalyst: Function;
  convertToPrecisionValueInPricePrecisionUnit: Function;
  stopLossOrTakeProfitPrice: number;
}

const ChildOrdersEditTPSL: React.FC<ChildOrdersEditTPSLProps> = ({
  side,
  type,
  triggerPrice,
  limitPrice,
  signalId,
  setShowEditTPSLModal,
  dispatchLatestListOfSignalsForAnalyst,
  convertToPrecisionValueInPricePrecisionUnit,
  stopLossOrTakeProfitPrice
}) => {
  const [showEditTriggerPriceBox, setshowEditTriggerPriceBox] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [estimatedPnl, setEstimatedPnl] = useState(0);
  const [error, setError] = useState("");

  const [updationWarning, setUpdationWarning] = useState({
    state: false,
    message: ""
  });

  const handleDeletionWarningModal = () => {
    setUpdationWarning({ state: false, message: "" });
    setShowEditTPSLModal(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setError("");
    if (triggerPrice) {
      setUpdatedPrice(convertToPrecisionValueInPricePrecisionUnit(triggerPrice));
    }
  }, [triggerPrice]);

  useEffect(() => {
    setError("");
    const diff = Math.abs(limitPrice - Number(updatedPrice));
    const roePercentage = Math.round((diff / limitPrice) * 100 * 100) / 100;
    if (type === "TP") {
      if (side === "BUY" || side === "LONG") {
        if (Number(updatedPrice) < limitPrice) {
          setError("Trigger Price can not be lesser than limit price");
          setEstimatedPnl(0);
        } else {
          setEstimatedPnl(roePercentage);
        }
      } else {
        if (Number(updatedPrice) > limitPrice) {
          setError("Trigger Price can not be greater than limit price");
          setEstimatedPnl(0);
        } else {
          setEstimatedPnl(roePercentage);
        }
      }
    } else {
      if (side === "BUY" || side === "LONG") {
        if (Number(updatedPrice) > limitPrice) {
          setError("Trigger Price can not be greater than limit price");
          setEstimatedPnl(0);
        } else {
          setEstimatedPnl(-1 * roePercentage);
        }
      } else {
        if (Number(updatedPrice) < limitPrice) {
          setError("Trigger Price can not be lesser than limit price");
          setEstimatedPnl(0);
        } else {
          setEstimatedPnl(-1 * roePercentage);
        }
      }
    }
  }, [updatedPrice]);

  const handleChangeUpdatedPrice = (e: any) => {
    setError("");
    setUpdatedPrice(convertToPrecisionValueInPricePrecisionUnit(e.target.value));
  };
  const handleClose = () => {
    setUpdatedPrice(convertToPrecisionValueInPricePrecisionUnit(triggerPrice));
    setshowEditTriggerPriceBox(false);
    setError("");
  };

  const handleUpdateTPSLPrice = () => {
    const reqBody: { signalId: string; takeProfitStopPrice: number; stopLossStopPrice: number } = {
      signalId,
      takeProfitStopPrice: type === "TP" ? Number(updatedPrice) : Number(stopLossOrTakeProfitPrice),
      stopLossStopPrice: type === "TP" ? Number(stopLossOrTakeProfitPrice) : Number(updatedPrice)
    };
    editASignal(reqBody)
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        setShowEditTPSLModal(false);
        setshowEditTriggerPriceBox(false);
      })
      .catch((err: any) => {
        setshowEditTriggerPriceBox(false);
        dispatch(
          showSnackBar({
            src: "UPDATE_TP_SL_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
      });
  };

  const submitNewPrice = () => {
    if (error) {
      return;
    }
    fetchSignalToBeDeleted(signalId).then((signalToBeUpdated: any[]) => {
      if (signalToBeUpdated.length > 0) {
        const signalStatus = signalToBeUpdated[0].status;
        if (signalStatus !== "NEW" && signalStatus !== "PUBLISHED") {
          setUpdationWarning({ state: true, message: "Signal has been Triggered. You can't edit TP/SL. However, you can add multiple TP/SLs now" });
        } else {
          handleUpdateTPSLPrice();
        }
      }
    });
  };

  return (
    <Grid
      xs={5.8}
      sx={{
        ...CHILD_ORDERS_CONTAINER,
        background:
          type === "TP"
            ? "linear-gradient(179deg, rgba(41, 181, 126, 0.40) -389.3%, rgba(41, 181, 126, 0.00) 126.66%)"
            : "linear-gradient(180deg, rgba(255, 101, 84, 0.40) -252.71%, rgba(254, 101, 84, 0.00) 124.85%)"
      }}
    >
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <Typography variant="Medium_14">{type === "TP" ? "Take Profit" : "Stop Loss"}</Typography>
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <Typography color={"text.secondary"} variant="Regular_14">
          Side
        </Typography>
        {side === "SELL" ? <BuyCellTab side={"BUY"} /> : <BuyCellTab side={"SELL"} />}
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <Typography color={"text.secondary"} variant="Regular_14">
          {"Trigger Price (USDT)"}
        </Typography>

        {!showEditTriggerPriceBox && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography id="Take-Profit-triggerPrice" variant="SemiBold_12">
              {triggerPrice}
            </Typography>
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
              <CloseIcon id="openOrderModal-Close-BTN" onClick={handleClose} fontSize="14px" style={{ marginLeft: "8px", cursor: "pointer" }} />
              <CheckIcon id="openOrderModal-Right-Btn" onClick={submitNewPrice} fontSize="14px" style={{ marginLeft: "8px", color: error ? "gray" : "#E2FF6F", cursor: !error && "pointer" }} />
            </Box>
            {error && (
              <Typography component={"div"} variant="Medium_12" color={"text.error"}>
                {error}
              </Typography>
            )}
          </>
        )}
      </Grid>
      <Grid container sx={{ ...justifyGridSx, my: 1 }}>
        <Typography color={"text.secondary"} variant="Regular_14">
          Estimated ROI%
        </Typography>
        <Typography id="Take-Profit-EST-PnL" variant="SemiBold_12" color={type === "TP" ? "text.success" : "text.error"}>
          {estimatedPnl ? `${estimatedPnl} %` : "--"}
        </Typography>
      </Grid>
      <ActionWarningModal
        IsOpen={updationWarning.state}
        handleShowDeletionModal={handleDeletionWarningModal}
        dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
        showDeleteWarning={updationWarning}
      />
    </Grid>
  );
};

export default ChildOrdersEditTPSL;
