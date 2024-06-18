// import { Button } from '@/components/UI/Atoms/Button/Button'
import { Grid, Typography } from "@mui/material";
// import CustomButton from '@/components/UI/CustomButton/CustomButton'
import React, { useState } from "react";

import { deleteASignal, publishALiveSignal } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { _24hrTicker } from "@/frontend-api-service/Api";
import ActionWarningModal from "../Modals/ActionWarningModal";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { cancelPublishedSignal } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { fetchSignalToBeDeleted } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import WarningBeforeDeleteModal from "../Modals/WarningDeleteModal";

interface ActionsCellProps {
  gridSize: number;
  status: string;
  dispatchLatestListOfSignalsForAnalyst: () => void;
  signalId: string;
  symbol: string;
  limitPrice: number;
  side: string;
  type: string;
  triggerPrice: number;
}
const ActionsCell: React.FC<ActionsCellProps> = ({ gridSize, status, dispatchLatestListOfSignalsForAnalyst, signalId, type, side, limitPrice, symbol, triggerPrice }) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState({ state: false, message: "" });
  const [loader, setLoader] = useState(false);
  const [showWarningBeforeDelete, setShowWarningBeforeDelete] = useState(false);
  const dispatch = useDispatch();

  const cancelSignal = () => {
    cancelPublishedSignal({ signalId })
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        setLoader(false);
      })
      .catch((err: any) => {
        setLoader(false);
        dispatch(
          showSnackBar({
            src: "DELETE_SIGNAL:_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
      });
  };

  const handleDeletionWarningModal = () => {
    setShowDeleteWarning({ state: false, message: "" });
  };

  const deleteSignal = () => {
    setLoader(true);
    deleteASignal(signalId)
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        setLoader(false);
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "DELETE_SIGNAL:_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setLoader(false);
      });
  };
  const handleDelete = () => {
    if (status === "PUBLISHED") {
      setLoader(true);
      fetchSignalToBeDeleted(signalId).then((data: any) => {
        if (data && data.length > 0) {
          const signalStatus = data[0]?.status;
          if (signalStatus !== "PUBLISHED") {
            setLoader(false);
            setShowDeleteWarning({
              state: true,
              message: `Signal has been triggered, you cannot delete the signal now. However, you can add multiple TP/SLs to change your exit strategy`
            });
          } else {
            cancelSignal();
          }
        } else {
          setLoader(false);
          dispatch(
            showSnackBar({
              src: "DELETE_SIGNAL:_FAILED",
              message: "Failed to Delete Signal",
              type: "failure"
            })
          );
        }
      });
    } else {
      deleteSignal();
    }
  };

  const publishSignal = () => {
    publishALiveSignal({ signalId }).then(() => {
      dispatchLatestListOfSignalsForAnalyst();
    });
  };

  const handlePublish = () => {
    _24hrTicker(symbol).then((res: any) => {
      const lastTradedPrice = res.data.lastPrice;
      const diff = (parseFloat(lastTradedPrice) * 0.1) / 100;
      if (type === "LIMIT") {
        if (side === "BUY" || side === "LONG") {
          const newLTP = parseFloat(lastTradedPrice) - diff;
          if (newLTP <= limitPrice) {
            setShowDeleteWarning({
              state: true,
              message: `Cannot place signal as the the current market price  is very close to the Limit price. Please edit the Limit price`
            });
            return;
          } else publishSignal();
        } else {
          const newLTP = parseFloat(lastTradedPrice) + diff;
          if (newLTP >= limitPrice) {
            setShowDeleteWarning({
              state: true,
              message: `Cannot place signal as the the current market price  is very close to the Limit price. Please edit the Limit price`
            });
            return;
          } else publishSignal();
        }
      } else {
        const upperBound = parseFloat(lastTradedPrice) + diff;
        const lowerBound = parseFloat(lastTradedPrice) - diff;

        if (triggerPrice <= upperBound && triggerPrice >= lowerBound) {
          setShowDeleteWarning({
            state: true,
            message: `Cannot place signal as the the current market price  is very close to the Trigger price. Please edit the Trigger price`
          });
          return;
        } else publishSignal();
      }
    });
  };

  const handleDeleteButtonClick = () => {
    if (status === "PUBLISHED") setShowWarningBeforeDelete(true);
    else handleDelete();
  };
  return (
    <Grid item container alignItems={"center"} xs={gridSize} gap={2}>
      <Grid item xs={4}>
        {status === "NEW" && (
          <Typography
            variant={"Bold_14"}
            onClick={handlePublish}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
          >
            {"Publish"}
          </Typography>
        )}
      </Grid>
      <Grid item xs={4}>
        {(status === "PUBLISHED" || status === "NEW") && (
          <Typography
            variant={"Bold_14"}
            onClick={handleDeleteButtonClick}
            color={"text.error"}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "3px",
              textUnderlineOffset: "4px"
            }}
          >
            {"Delete"}
          </Typography>
        )}
      </Grid>
      {showDeleteWarning && (
        <ActionWarningModal
          IsOpen={showDeleteWarning.state}
          handleShowDeletionModal={handleDeletionWarningModal}
          dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
          showDeleteWarning={showDeleteWarning}
        />
      )}
      {showWarningBeforeDelete && (
        <WarningBeforeDeleteModal
          IsOpen={showWarningBeforeDelete}
          primaryAction={handleDelete}
          handleShowWarningBeforeDeleteModal={() => setShowWarningBeforeDelete(false)}
          message={
            "Deleting the signal may not remove all follower positions due to market conditions. If a signal has been converted into a position by the time we attempt cancellation, that position will remain. Are you sure you want to proceed with the deletion?"
          }
          loader={loader}
        />
      )}
    </Grid>
  );
};

export default ActionsCell;
