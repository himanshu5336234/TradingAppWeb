import { initiatePanValidation, initiateKyc, regenerateKyc } from "@/frontend-api-service/Api";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

export interface KycResponse {
  id: string;
  userID: string;
  status: string;
  poiDocumentType: string;
  poiNumber: string;
  poiName: string;
  poaDocumentType: string;
  poaNumber: string;
  poaName: string;
  quickKYCAttemptRemaining: number;
  manualKYCAttemptRemaining: number;
  createdAt: number;
  updatedAt: number;
  flowData: {
    referenceId: string;
    flowStatus: string;
    remarks: string;
    externalSource: string;
    workFlowType: string;
    createdAt: number;
    updatedAt: number;
  };
}

interface PanValidationPayload {
  payload: any; // Replace 'any' with the actual type of payload
  callback: (status: boolean) => void;
}

export const getPanValidation = ({ payload, callback }: PanValidationPayload): void => {
  callback(true);
  return initiatePanValidation({ payload })
    .then((_response: any) => {
      callback(false);
      return _response.data;
    })
    .catch((_errorResponse: any) => {
      callback(false);
      return _errorResponse;
    });
};

interface InitiateKycPayload {
  payload: any; // Replace 'any' with the actual type of payload
  callback: (status: boolean) => void;
  snackBar: () => void;
}

export const initiateKycVerification = ({ payload, callback, snackBar }: InitiateKycPayload): void => {
  callback(true);
  return initiateKyc({ payload })
    .then((_response: any) => {
      callback(false);

      return { ..._response.data };
    })
    .catch(({ response }: any) => {
      callback(false);
      snackBar(
        showSnackBar({
          src: "INITIATE_KYC_",
          message: "Digilocker/NSDL servers are facing issues, Please try again after sometime",
          type: "failure"
        })
      );
    });
};
export const regenerateKycToken = ({ payload, callback, snackBar }: InitiateKycPayload): void => {
  callback(true);
  return regenerateKyc({ payload })
    .then((_response: any) => {
      callback(false);
      return { ..._response.data };
    })
    .catch(({ response }: any) => {
      callback(false);
      snackBar(
        showSnackBar({
          src: "RE_INITIATE_KYC_",
          message: "Digilocker/NSDL servers are facing issues, Please try again after sometime",
          type: "failure"
        })
      );
    });
};
