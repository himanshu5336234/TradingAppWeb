/* eslint-disable no-unused-vars */
import { getBankDetail } from "../../redux/actions/User/UserKyc.ac";
import { AddNewBankAccount, DeleteBankAccount, GetAccountStatusById, UpdateBankAccount } from "../../../frontend-api-service/Api";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { setProfileDetails } from "@/frontend-BL/redux/actions/User/SetProfile.ac";

const STEPDETAILSSTATUS = ["VERIFIED"];
const useBankVerification = () => {
  const dispatch = useDispatch();
  const [isBankVeriOpen, setisBankVeriOpen] = useState(false);
  const { getBankDetails } = useSelector((state) => state.getBankDetails);
  const [isLoader, setIsLoader] = useState({
    id: "",
    open: false,
    type: "",
    title: "",
    primaryMessage: "",
    secondaryMessage: ""
  });
  const SETISLOADER = useCallback(
    (payload) => {
      setIsLoader(payload);
    },
    [isLoader]
  );
  useEffect(() => {
    let minutes = 0;
    let interval = null;
    const STEPID = isLoader?.id;
    if (isLoader.open === true && STEPID.length > 0) {
      interval = setInterval(() => {
        if (minutes !== 5 && STEPID.length > 0) {
          GetAccountStatusById(STEPID).then((response) => {
            const bankAccountStatus = response?.data?.pennyDropStatus;
            if (bankAccountStatus === "PENDING") {
              SETISLOADER({
                ...isLoader,
                type: bankAccountStatus,
                title: "Bank Account"
              });
            } else if (bankAccountStatus === "FAILED") {
              SETISLOADER({
                ...isLoader,
                type: bankAccountStatus,
                title: "Bank Account"
              });
              clearInterval(interval);
            } else if (STEPDETAILSSTATUS.includes(bankAccountStatus)) {
              dispatch(getBankDetail());
              dispatch(setProfileDetails());
              SETISLOADER({
                ...isLoader,
                type: bankAccountStatus
              });
              clearInterval(interval);
            }
          });
          minutes += 1;
        } else {
          SETISLOADER({
            ...isLoader,
            id: "",
            type: "long",
            title: "Bank Account"
          });
          dispatch(setProfileDetails());
          clearInterval(interval);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoader.open]);

  useEffect(() => {
    if (getBankDetails?.bankAccounts?.length <= 0) {
      setisBankVeriOpen(true);
    } else {
      setisBankVeriOpen(false);
    }
  }, [getBankDetails?.bankAccounts]);

  const generateAddBankAccountSecondaryMessage = (payload) => {
    const maskedAccountNumber = "xxxxx" + payload.accountNumber.slice(-4);

    const secondaryMessage = "Great news! Your bank verification has been successfully completed with your bank account number " + maskedAccountNumber + " and IFSC code " + payload.ifsc;

    return secondaryMessage;
  };

  const AddBankAccount = (payload) => {
    const PAYLOAD = {
      ...payload,
      isPrimary: !(getBankDetails?.bankAccounts?.length > 0)
    };
    AddNewBankAccount(PAYLOAD)
      .then((response) => {
        if (response?.data) {
          const STEPID = response?.data?.id;
          setisBankVeriOpen(false);
          SETISLOADER({
            ...isLoader,
            id: STEPID,
            open: true,
            title: "Bank Account",
            primaryMessage: "Bank Account is successfully Added",
            secondaryMessage: generateAddBankAccountSecondaryMessage(payload),
            type: "loading"
          });
        }
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "ADD_ACCOUNT_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  };

  const UpdateBankAccountSecondaryToPrimary = (payload, setPrimaryModal) => {
    UpdateBankAccount(payload)
      .then((response) => {
        SETISLOADER({
          id: "",
          open: true,
          type: "loading",
          title: "Bank Account"
        });
        setPrimaryModal(false);
        if (response.data.pennyDropStatus === "VERIFIED") {
          SETISLOADER({
            id: "",
            open: true,
            type: "VERIFIED",
            primaryMessage: "Congratulations!",
            secondaryMessage: "Your Primary bank account is update."
          });
          dispatch(getBankDetail());
        } else {
          SETISLOADER({ ...isLoader, type: "", title: "", id: "" });
        }
      })
      .catch((errorResponse) => {
        SETISLOADER({ ...isLoader, type: "", title: "", id: "" });
        dispatch(
          showSnackBar({
            src: "ADD_ACCOUNT_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  };
  const deleteBankAccount = (payload, setDeleteModal) => {
    SETISLOADER({
      id: "",
      open: true,
      type: "loading",
      title: ""
    });
    DeleteBankAccount(payload)
      .then((response) => {
        SETISLOADER({
          id: "",
          open: true,
          title: "Bank Account",
          type: "VERIFIED",
          primaryMessage: "Bank Account is successfully deleted"
        });
        setDeleteModal(false);
        dispatch(getBankDetail());
      })
      .catch((errorResponse) => {
        SETISLOADER({
          id: "",
          open: true,
          type: "",
          title: ""
        });
        dispatch(
          showSnackBar({
            src: "ADD_ACCOUNT_FAIL",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
      });
  };
  return {
    isLoader,
    SETISLOADER,
    isBankVeriOpen,
    getBankDetails,
    setisBankVeriOpen,
    AddBankAccount,
    UpdateBankAccountSecondaryToPrimary,
    deleteBankAccount
  };
};

export default useBankVerification;
