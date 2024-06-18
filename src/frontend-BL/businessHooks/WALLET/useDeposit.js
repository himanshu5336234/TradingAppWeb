import { fetchDensityBankAccountDetailsapi, fiatDepositApi } from "../../../frontend-api-service/Api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { recordCleverTapEvent } from "../../../utils/recordCleverTapEvent";

export const useDeposit = ({ paymentMethod }) => {
  const { getBankDetails } = useSelector((state) => state.getBankDetails);
  const [activeStep, setActiveStep] = useState(0);
  const [densityBankAccount, setDensityBankAccount] = useState({});
  const [depositStatus, setDepositStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    referenceId: "",
    accountNumber: "",
    depositAmount: ""
  });
  const [helperText, setHelperText] = useState({
    referenceId: "",
    accountNumber: "",
    depositAmount: ""
  });
  const profileData = useSelector((state) => state.profile.profileDetails);
  const dispatch = useDispatch();
  const SETFORMDATA = useCallback(
    (payload) => {
      if (payload?.depositAmount < 0) return;
      let error = { depositAmount: "" };
      if (payload?.depositAmount === "") {
        error = { ...error, depositAmount: "" };
      } else if (parseInt(payload?.depositAmount) < 500) {
        error = {
          ...error,
          depositAmount: "Minimum deposit amount is 500 INR"
        };
      } else if (parseInt(payload?.depositAmount) > 500000) {
        error = {
          ...error,
          depositAmount: "Maximum deposit amount is 500000 INR"
        };
      } else if (parseInt(payload?.depositAmount) >= 500) {
        error = { ...error, depositAmount: "" };
      }
      setFormData(payload);
      setHelperText({ ...helperText, ...error });
    },
    [formData]
  );
  useEffect(() => {
    fetchDensityBankAccountDetailsapi()
      .then((successResponse) => {
        setDensityBankAccount(successResponse.data[0]);
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "FETCH_DENSITY_BANK_ACCOUNT_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
    if (getBankDetails?.bankAccounts?.length > 0) {
      SETFORMDATA({
        ...formData,
        accountNumber: getBankDetails?.bankAccounts[0]?.accountNumber
      });
    }
  }, [getBankDetails]);
  const SubmitFormData = () => {
    let error = { referenceId: "" };
    if (formData?.referenceId?.length <= 0) {
      error = { ...error, referenceId: "Enter referenceId " };
    }
    setHelperText({ ...helperText, ...error });

    if (error.referenceId === "") {
      setLoading(true);
      recordCleverTapEvent("DEPOSIT_INITIATE_REF_ID_ENTERED", {
        Email: profileData.email,
        Identity: profileData.email,
        Amount: Math.trunc(parseFloat(formData?.depositAmount) * 100) / 100,
        paymentMode: paymentMethod
      });
      fiatDepositApi(
        JSON.stringify({
          amount: Math.trunc(parseFloat(formData?.depositAmount) * 100) / 100,
          refId: formData?.referenceId,
          convertToCryptoAssetOnSuccess: false
        })
      )
        .then((successResponse) => {
          setLoading(false);
          setDepositStatus(successResponse.data.fiatTransactionStatus);
          setActiveStep(2);
          recordCleverTapEvent("DEPOSIT_COMPLETED", {
            Email: profileData.email,
            Identity: profileData.email,
            Amount: Math.trunc(parseFloat(formData?.depositAmount) * 100) / 100,
            paymentMode: paymentMethod
          });
        })
        .catch((errorResponse) => {
          dispatch(
            showSnackBar({
              src: "ADD_DEPOSITE_AMOUNT_FAIL",
              message: errorResponse.response.data.details,
              type: "failure"
            })
          );
          recordCleverTapEvent("DEPOSIT_FAILED", {
            Email: profileData.email,
            Identity: profileData.email,
            Amount: Math.trunc(parseFloat(formData?.depositAmount) * 100) / 100,
            paymentMode: paymentMethod
          });
          setActiveStep(3);
          setLoading(false);
        });
    }
  };

  const SubmitFormDataWithAmt = () => {
    let error = { depositAmount: "" };
    if (formData?.accountNumber?.length <= 0) {
      error = { ...error, accountNumber: "Enter Account number" };
    } else if (formData?.depositAmount?.length <= 0) {
      error = { ...error, depositAmount: "Enter Deposit Amount " };
    } else if (formData?.depositAmount < 500) {
      error = {
        ...error,
        depositAmount: "Minimum deposit amount is 500 INR"
      };
    } else if (formData?.depositAmount > 500000) {
      error = {
        ...error,
        depositAmount: "Maximum deposit amount is 500000 INR"
      };
    }
    setHelperText({ ...helperText, ...error });

    if (error.depositAmount === "") {
      setActiveStep(activeStep + 1);
      recordCleverTapEvent("DEPOSIT_INITIATE_AMOUNT_ENTERED", {
        Email: profileData.email,
        Identity: profileData.email,
        Amount: Math.trunc(parseFloat(formData?.depositAmount) * 100) / 100,
        paymentMode: paymentMethod
      });
    }
  };
  const Previous = () => {
    setActiveStep(activeStep - 1);
  };

  const setPrimaryAction = () => {
    if (activeStep === 1) {
      return SubmitFormData;
    } else {
      return SubmitFormDataWithAmt;
    }
  };

  const setSecondaryAction = () => {
    if (activeStep === 0) {
      return close;
    }
    return Previous;
  };
  const PrimaryAction = setPrimaryAction();
  const SecondaryAction = setSecondaryAction();

  const handleAmtSubmit = () => {
    PrimaryAction();
  };
  return {
    formData,
    activeStep,
    helperText,
    densityBankAccount,
    SecondaryAction,
    PrimaryAction,
    SETFORMDATA,
    depositStatus,
    loading,
    handleAmtSubmit
  };
};
