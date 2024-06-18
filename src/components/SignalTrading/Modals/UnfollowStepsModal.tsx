import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import StatusBody from "./StatusBody";
import { Box, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { unfollowAnAnalyst } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

interface UnfollowSuccessModalProps {
  IsOpen: boolean;
  setShowUnfollowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  analystId: string;
}

const UnfollowStepsModal: React.FC<UnfollowSuccessModalProps> = ({ IsOpen, setShowUnfollowSuccessModal, name, analystId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [unfollowReason, setUnfollowReason] = useState("");
  const [checkBoxState, setcheckBoxStatee] = useState("");

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckBox = (e: any) => {
    setUnfollowReason("");
    if (e.target.value !== "OTHER") {
      setcheckBoxStatee("");
      setUnfollowReason(e.target.value);
    }
    setcheckBoxStatee(e.target.value);
  };
  const handleUnfollow = () => {
    unfollowAnAnalyst({
      analystId: analystId,
      reason: unfollowReason
    })
      .then(() => {
        setShowUnfollowSuccessModal(false);
        window.location.href = "/signal-trading";
      })
      .catch((err) => {
        dispatch(
          showSnackBar({
            src: "UNFOLLOW_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setShowUnfollowSuccessModal(false);
      });
  };

  const getActions = () => {
    switch (activeStep) {
      case 0:
        return {
          primaryName: "Yes, I am Sure",
          secondaryName: "Dismiss",
          primaryAction: () => setActiveStep(1),
          secondaryAction: () => setShowUnfollowSuccessModal(false)
        };
      // case 1:
      //   return (
      //     {
      //       primaryName: "Continue",
      //       secondaryName: "Cancel",
      //       primaryAction: () => setActiveStep(2),
      //       secondaryAction: () => setShowUnfollowSuccessModal(false)
      //     }
      //   )
      default:
        return {
          primaryName: "Continue",
          secondaryName: "",
          primaryAction: handleUnfollow,
          secondaryAction: () => setShowUnfollowSuccessModal(false)
        };
    }
  };

  const { primaryAction, primaryName, secondaryName, secondaryAction } = getActions();

  const getContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StatusBody
            message={"You are unfollowing " + name + ". Unfollowing the analyst will close all your existing open orders and positions from signals, do you want to continue ?"}
            heading={"Are You sure ?"}
            status={"WARNING"}
          />
        );
      // case 1:
      //    return (
      //         <StatusBody
      //         message={"You are unfollowing " + name + ". You may follow them back again."}
      //         heading={"Unfollow Analyst"}
      //         status={"WARNING"} />
      //     )
      default:
        return (
          <Box>
            <StatusBody message={"We want to continuously make your trading experience bettter. Let us know the reason to unfollow this trade"} heading={"Unfollow Successfull"} status={"SUCCESS"} />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckBox} checked={checkBoxState === "UNSATISFACTORY_ROI"} value={"UNSATISFACTORY_ROI"} />}
                label="Unsatisfactory ROI from Analyst"
              />
              <FormControlLabel control={<Checkbox onChange={handleCheckBox} checked={checkBoxState === "ANALYST_NOT_ACTIVE"} value={"ANALYST_NOT_ACTIVE"} />} label="Analyst not active" />
              <FormControlLabel control={<Checkbox onChange={handleCheckBox} checked={checkBoxState === "NOT_ENOUGH_FUNDS"} value={"NOT_ENOUGH_FUNDS"} />} label="Don’t have enough funds to invest" />
              <FormControlLabel control={<Checkbox onChange={handleCheckBox} checked={checkBoxState === "FOUND_BETTER_ANALYST"} value={"FOUND_BETTER_ANALYST"} />} label="Found a better analyst" />
              <FormControlLabel control={<Checkbox onChange={handleCheckBox} checked={checkBoxState === "OTHER"} value={"OTHER"} />} label="Other" />
            </FormGroup>
            {checkBoxState === "OTHER" && (
              <TextField
                // variant="outlined"
                value={unfollowReason}
                onChange={(event) => {
                  setUnfollowReason(event.target.value);
                }}
                type={"text"}
                inputProps={{
                  style: {
                    padding: "4px",
                    backgroundColor: "#39393D",
                    fontSize: "14px",
                    height: "40px"
                  }
                }}
                sx={{ width: "100%" }}
              />
            )}
          </Box>
        );
    }
  };

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      close={() => setShowUnfollowSuccessModal(false)}
      isPrimaryAction={true}
      primaryName={primaryName}
      secondaryName={secondaryName}
      isDisabled={activeStep === 2 && unfollowReason === ""}
      isSecondaryAction={activeStep === 0}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      ContainerSx={{ maxWidth: { lg: "420px", sm: "400px", xs: "350px" } }}
    >
      {getContent()}
    </CustomModal>
  );
};

export default UnfollowStepsModal;
