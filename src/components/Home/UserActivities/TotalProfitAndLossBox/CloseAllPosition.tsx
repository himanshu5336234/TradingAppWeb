import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import CloseAllModal from "@/components/CustomModals/CloseAllModal";
import { DENSITY_WS_SUBSCRIBE_CLOSE_ORDER } from "@/frontend-BL/redux/constants/Constants";
import { closeAllActivePositions } from "@/frontend-api-service/Api";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { usePostHog } from "posthog-js/react";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
// import CustomButton from "@/components/UI/CustomButton/CustomButton";
export const CloseAllPosition = () => {
  const postHog = usePostHog();
  const openPositions = useSelector((state: any) => state.positionsDirectory.currentPositions);

  const [closeAllPositionApiResponseStatus, setCloseAllPositionApiResponseStatus] = useState(false);

  const [closeAllPosition, setCloseAllPosition] = useState(false);
  const dispatch = useDispatch<any>();
  const CloseAllPositionButton = () => {
    setCloseAllPositionApiResponseStatus(true);
    closeAllActivePositions()
      .then((response: { status: number; data: { errors: any[]; message: string | any[] } }) => {
        if (response.status === 200) {
          setCloseAllPositionApiResponseStatus(false);
          let closeAllErr: any = [];
          if (response?.data?.errors && response?.data?.errors?.length > 0) {
            response.data?.errors.map((err) => {
              closeAllErr?.push(err.message);
              dispatch(
                showSnackBar({
                  src: DENSITY_WS_SUBSCRIBE_CLOSE_ORDER + "FAIL",
                  message: err.message,
                  type: "failure"
                })
              );
            });
            recordCleverTapEvent("CLOSE_ALL_POSITION_FAILED", {
              error: JSON.stringify(closeAllErr)
            });
          }

          if (response?.data?.message.length > 0) {
            setCloseAllPosition(false);
            recordCleverTapEvent("CLOSE_ALL_POSITION_SUCCESS", {});
            dispatch(
              showSnackBar({
                src: "close all position",
                message: "All order has been cancelled successfully",
                type: "success"
              })
            );
            dispatch({
              type: DENSITY_WS_SUBSCRIBE_CLOSE_ORDER,
              payload: {
                data: response?.data?.message,
                type: "MARKET",
                eventType: "CLOSE_ORDER"
              }
            });
          }
        }
      })
      .catch((error: { response: { data: { details: any } } }) => {
        setCloseAllPositionApiResponseStatus(false);
        recordCleverTapEvent("CLOSE_ALL_POSITION_FAILED", {
          error: error.response.data.details
        });
        dispatch(
          showSnackBar({
            src: "CREATE_ORDER_FAILED",
            message: error.response.data.details,
            type: "failure"
          })
        );
      });
  };

  const handleCloseAllPostion = () => {
    postHog.capture("close_all_position_button_click", {
      event_time: new Date().toUTCString()
    });
    if (localStorage.getItem("doNotShowAgainAllPositionCloseModal") !== "true") {
      setCloseAllPosition(true);
    } else {
      CloseAllPositionButton();
    }
  };

  return (
    <>
      <CustomButton
        style={{ p: 0.8 }}
        id="close-allPosition-button"
        loadingTextDisable={true}
        isDisabled={closeAllPositionApiResponseStatus || openPositions.length === 0}
        isloading={closeAllPositionApiResponseStatus}
        onClick={handleCloseAllPostion}
        label={"close All"}
        variant={"closePositionfailed"}
      />
      {closeAllPosition && (
        <CloseAllModal
          close={() => {
            setCloseAllPosition(false);
            setCloseAllPositionApiResponseStatus(false);
          }}
          isOpen={closeAllPosition}
          closeAllPositionApiResponseStatus={closeAllPositionApiResponseStatus}
          positionEntry={CloseAllPositionButton}
        />
      )}
    </>
  );
};
CloseAllPosition.propTypes = {
  isDisable: PropTypes.bool
};
