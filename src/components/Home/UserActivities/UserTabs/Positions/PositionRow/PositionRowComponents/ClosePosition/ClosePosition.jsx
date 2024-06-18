import React, { useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { CLOSEPOSITON } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import CloseModal from "@/components/CustomModals/CloseModal";
import CustomButton from "@/components/UI/CustomButton/CustomButton";

const ClosePosition = ({ symbol, variant, textVariant }) => {
  const [closePosition, setClosePosition] = useState({ isOpen: false });
  const [closePositionApiResponseStatus, setClosePositionApiResponseStatus] = useState(false);
  const dispatch = useDispatch();
  const ClosePositionButton = (payload) => {
    if (localStorage.getItem("doNotShowAgainPositionCloseModal") !== "true") {
      setClosePosition({ ...payload, isOpen: true });
    } else {
      setClosePositionApiResponseStatus(true);
      dispatch(
        CLOSEPOSITON(payload?.symbol, () => {
          setClosePositionApiResponseStatus(false);
        })
      );
    }
  };
  return (
    <>
      <CustomButton
        id="position-close-button"
        label={"Close"}
        isloading={closePositionApiResponseStatus}
        isDisabled={closePositionApiResponseStatus}
        variant={variant}
        style={{ fontSize: "12px", p: { md: "4px 10px" }, height: "100%" }}
        loadingTextDisable={true}
        onClick={() => ClosePositionButton({ symbol })}
      />
      {closePosition.isOpen && (
        <CloseModal
          isOpen={closePosition}
          isloading={closePositionApiResponseStatus}
          isDisabled={closePositionApiResponseStatus}
          close={() => {
            setClosePosition({ isOpen: false });
            setClosePositionApiResponseStatus(false);
          }}
          positionEntry={() => {
            setClosePositionApiResponseStatus(true);
            dispatch(
              CLOSEPOSITON(closePosition?.symbol, () => {
                setClosePositionApiResponseStatus(false);
                setClosePosition({ isOpen: false });
              })
            );
          }}
          message={`You are about to close the Position for ${closePosition?.symbol} .`}
        />
      )}
    </>
  );
};

ClosePosition.propTypes = {
  symbol: PropTypes.string,
  variant: PropTypes.string,
  textVariant: PropTypes.string
};

export default ClosePosition;
