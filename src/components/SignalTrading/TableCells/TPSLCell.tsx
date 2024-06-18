import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import EditIcon from "../../../assets/images/EditSquare.svg";
import AddTPSLModal from "../Modals/AddTPSLModal";
import EditTPSLModal from "../Modals/EditTPSLModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignalToBeDeleted } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import ActionWarningModal from "../Modals/ActionWarningModal";
interface TPSLCellProps {
  gridSize: number;
  takeProfit: string;
  stopLoss: string;
  status: string;
  signalData: any;
  dispatchLatestListOfSignalsForAnalyst: Function;
}

const TPSLCell: React.FC<TPSLCellProps> = ({ gridSize, takeProfit, stopLoss, status, signalData, dispatchLatestListOfSignalsForAnalyst }) => {
  const [showEditTPSLModal, setShowEditTPSLModal] = useState(false);
  const [showAddTPSLModal, setShowAddTPSLModal] = useState(false);
  const { userType } = useSelector((state: any) => state.SignalTrading.userPersonna);
  const dispatch = useDispatch();
  const [showDeleteWarning, setShowDeleteWarning] = useState({
    state: false,
    message: ""
  });

  const handleDeletionWarningModal = () => {
    setShowDeleteWarning({ state: false, message: "" });
  };

  const handleClick = () => {
    if (status === "PUBLISHED") {
      fetchSignalToBeDeleted(signalData?.signalId).then((data: any) => {
        if (data && data.length > 0) {
          const signalStatus = data[0]?.status;
          if (signalStatus !== "NEW" && signalStatus !== "PUBLISHED") {
            setShowDeleteWarning({
              state: true,
              message: `Signal has been Triggered. You can't edit TP/SL. However, you can add multiple TP/SLs now`
            });
          } else {
            setShowEditTPSLModal(true);
          }
        } else {
          dispatch(
            showSnackBar({
              src: "DELETE_SIGNAL:_FAILED",
              message: "Failed to Delete Signal",
              type: "failure"
            })
          );
        }
      });
    } else if (status === "NEW") {
      setShowEditTPSLModal(true);
    } else if (status === "TRIGGERED") setShowAddTPSLModal(true);
  };

  return (
    <>
      <Grid item container xs={gridSize} alignItems={"center"} gap={2}>
        <Grid item>
          <Typography variant="Regular_14">
            {takeProfit || "--"}
            {"/"}
            <Typography component={"div"} variant="Regular_14">
              {stopLoss || "--"}
            </Typography>
          </Typography>
        </Grid>
        <Grid item>{userType === "ANALYST" && takeProfit && stopLoss && <img src={EditIcon} alt="Edit Icon" style={{ cursor: "pointer" }} onClick={handleClick} />}</Grid>
      </Grid>
      {showAddTPSLModal && (
        <AddTPSLModal IsOpen={showAddTPSLModal} setShowAddTPSLModal={setShowAddTPSLModal} signalData={signalData} dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst} />
      )}
      {showEditTPSLModal && (
        <EditTPSLModal IsOpen={showEditTPSLModal} setShowEditTPSLModal={setShowEditTPSLModal} signalData={signalData} dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst} />
      )}
      {showDeleteWarning.state && (
        <ActionWarningModal
          IsOpen={showDeleteWarning.state}
          dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
          showDeleteWarning={showDeleteWarning}
          handleShowDeletionModal={handleDeletionWarningModal}
        />
      )}
    </>
  );
};

export default TPSLCell;
