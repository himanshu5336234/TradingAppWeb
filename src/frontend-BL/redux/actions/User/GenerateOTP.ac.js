import { generateOTP } from "../../../../frontend-api-service/Api";

import { showSnackBar } from "../Internal/GlobalErrorHandler.ac";
export const GETOTP = () => (dispatch) => {
  generateOTP()
    .then((successResponse) => {
      const verificationIdFromServer = successResponse?.data?.data?.verificationID;
      return verificationIdFromServer;
    })
    .catch((errorResponse) => {
      dispatch(
        showSnackBar({
          src: "OTP",
          message: errorResponse.response.data.details,
          type: "failure"
        })
      );
    });
};
