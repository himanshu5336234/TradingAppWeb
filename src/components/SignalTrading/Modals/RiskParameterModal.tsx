import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

import { editRiskForAFollower, followAnAnalyst } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { useDispatch } from "react-redux";

import { fetchFollowerDetails, fetchUserPersonna } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";

interface RiskParameterModalProps {
  IsOpen: boolean;
  setShowRiskModal: Function;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  analystId: string;
  dispatchFetchAllAnalyst: Function;
  initialMarginPerSignal: number;
  initialMarginAcrossAllSignals: number;
}

const RiskParameterModal: React.FC<RiskParameterModalProps> = ({
  IsOpen,
  setShowRiskModal,
  type,
  analystId,
  setShowSuccessModal,
  dispatchFetchAllAnalyst,
  initialMarginAcrossAllSignals,
  initialMarginPerSignal
}) => {
  const [maxMarginPerSignal, setMaxMarginPerSignal] = useState(String(initialMarginPerSignal));
  const [maxMarginLockedAcrossAllSignals, setMaxMarginLockedAcrossAllSignals] = useState(String(initialMarginAcrossAllSignals));
  const [errorStateMarginLocked, setErrorStateMarginLocked] = useState("");
  const [errorStateMaxMarginPerSignal, setErrorStateMaxMarginPerSignal] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleMaxMarginChange = (e: any) => {
    setErrorStateMaxMarginPerSignal("");
    setMaxMarginPerSignal(e.target.value);
  };

  const handleMaxMarginLockedChange = (e: any) => {
    setErrorStateMarginLocked("");
    setMaxMarginLockedAcrossAllSignals(e.target.value);
  };

  const followAnalyst = () => {
    setLoader(true);

    followAnAnalyst({
      analystId: analystId,
      marginLocked: parseFloat(maxMarginLockedAcrossAllSignals),
      marginPerSignal: parseFloat(maxMarginPerSignal)
    })
      .then(() => {
        setLoader(false);
        setShowRiskModal((state: any) => ({ ...state, status: false }));
        setShowSuccessModal(true);
        dispatchFetchAllAnalyst();
        dispatch(fetchUserPersonna());
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "FOLLOW_ANALYST_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setLoader(false);
      });
  };

  const handleRiskUpdate = () => {
    if (!type) {
      if (maxMarginLockedAcrossAllSignals === "") {
        setErrorStateMarginLocked("Max Margin that can be locked across all signals cannot be be empty");
        return;
      }
      if (maxMarginPerSignal === "") {
        setErrorStateMaxMarginPerSignal("Max Margin allocated per signal cannnot be empty");
        return;
      }
      if (Number(maxMarginPerSignal) < 10) {
        setErrorStateMaxMarginPerSignal("Max Margin allocated per signal cannnot be less than 10 USDT");
        return;
      }
      if (Number(maxMarginLockedAcrossAllSignals) < 10) {
        setErrorStateMarginLocked("Max Margin that can be locked across all signals cannot be less than 10 USDT");
        return;
      }
      if (Number(maxMarginLockedAcrossAllSignals) < Number(maxMarginPerSignal)) {
        setErrorStateMarginLocked("Max Margin allocated per Signal can not be greater than Max Margin Allocated across all the Signals");
        setErrorStateMaxMarginPerSignal("Max Margin allocated per Signal can not be greater than Max Margin Allocated across all the Signals");
        return;
      }
      followAnalyst();
    } else if (type === "MARGIN_PER_SIGNAL") {
      if (Number(maxMarginPerSignal) < 10) {
        setErrorStateMaxMarginPerSignal("Max Margin allocated per signal cannnot be less than 10 USDT");
        return;
      }
      if (Number(maxMarginPerSignal) > initialMarginAcrossAllSignals) {
        setErrorStateMaxMarginPerSignal("Max Margin allocated per signal cannot be greater than the margin locked");
        return;
      }
    } else if (type === "MARGIN_ALL_SIGNAL") {
      if (Number(maxMarginLockedAcrossAllSignals) < 10) {
        setErrorStateMarginLocked("Max Margin allocated Across All signals cannnot be less than 10 USDT");
        return;
      }
      if (Number(maxMarginLockedAcrossAllSignals) < initialMarginPerSignal) {
        setErrorStateMarginLocked("Max Margin allocated Across All signals cannnot be less than Margin Allocated Per Signal");
        return;
      }
    }
    setLoader(true);
    editRiskForAFollower({
      analystId: analystId,
      ...(type === "MARGIN_PER_SIGNAL" ? { marginPerSignal: parseFloat(maxMarginPerSignal) } : { marginLocked: parseFloat(maxMarginLockedAcrossAllSignals) })
    })
      .then(() => {
        dispatch(fetchFollowerDetails({ status: "FOLLOW" }));
        setLoader(false);
        setShowRiskModal({ status: false, type: "" });
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <CustomModal
      IsOpen={IsOpen}
      isClose={true}
      primaryName={"Continue"}
      secondaryName={"Cancel"}
      isPrimaryAction={true}
      primaryAction={handleRiskUpdate}
      isSecondaryAction={true}
      secondaryAction={() => setShowRiskModal((state: any) => ({ ...state, status: false }))}
      close={() => setShowRiskModal((state: any) => ({ ...state, status: false }))}
      isDisabled={loader}
      isloading={loader}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"}>{"Set your Risk Parameters"}</Typography>
        <Typography component={"div"} mt={4} color={"#EBB62F"} variant={"Regular_12"}>
          {"The minimum amount for both fields is 10 USDT."}
        </Typography>
        {(!type || type === "MARGIN_PER_SIGNAL") && (
          <Box mt={1}>
            <BasicTextFields label={"Margin allocated for each Signal (USDT)"} value={maxMarginPerSignal} onChange={handleMaxMarginChange} type={"number"} />
            <Typography variant="SemiBold_11" color={"#C0DF5A"}>
              {"Note: "}
              <Typography variant="SemiBold_11" component={"span"} color={"text.secondary"}>
                {" At time analyst gives a signal, and this margin amount is not available, signal will be rejected."}
              </Typography>
            </Typography>
            {errorStateMaxMarginPerSignal !== "" && (
              <Typography component={"div"} color={"text.error"} variant="Regular_14">
                {errorStateMaxMarginPerSignal}
              </Typography>
            )}
          </Box>
        )}
        {(!type || type === "MARGIN_ALL_SIGNAL") && (
          <Box mt={1}>
            <BasicTextFields
              label={"Max margin that can be locked across all Signals for this Analyst (USDT)"}
              value={maxMarginLockedAcrossAllSignals}
              onChange={handleMaxMarginLockedChange}
              type={"number"}
            />
            <Typography variant="SemiBold_11" color={"#C0DF5A"}>
              {"Note: "}
              <Typography variant="SemiBold_11" component={"span"} color={"text.secondary"}>
                {" The total margin allocated across signals cannot exceed this value. All new signals will be rejected until margin gets freed up from previous signals."}
              </Typography>
            </Typography>
            {errorStateMarginLocked !== "" && (
              <Typography component={"div"} color={"text.error"} variant="Regular_14">
                {errorStateMarginLocked}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </CustomModal>
  );
};

export default RiskParameterModal;
