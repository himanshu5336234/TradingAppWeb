import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import BankVerificationModal from "@/components/UserVerification/BankVerification/BankVerificationModal";

// import DeleteIcon from "@mui/icons-material/Delete";
import HeaderComponent from "./HeaderComponent";

import useBankVerification from "BL/businessHooks/KYC_VERIFICATION/useBankVerification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { USER_SETTING_TABS } from "@/pages/Setting/Constants";

import AlertModal from "@/components/UI/CustomModals/AlertModal";
import StatusModal from "@/components/CustomModals/newModal/StatusModal";
import BankAccountDetails from "./BankAccountDetails";

interface BankAccountType {
  id: string;
  isPrimary: boolean;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branchName: string;
}
const AccountVerification = () => {
  const USER_SETTING_TABS = {
    USER_VERIFICATION: {
      name: "User Verification",
      route: "/user",
      value: "user-verification"
    }
  };
  const { profileDetails } = useSelector((state: any) => state.profile);
  const { isLoader, isBankVeriOpen, getBankDetails, SETISLOADER, setisBankVeriOpen, AddBankAccount, UpdateBankAccountSecondaryToPrimary, deleteBankAccount } = useBankVerification();
  const [isAlertOpen, setisAlertOpen] = useState({
    open: false,
    type: "",
    id: "",
    title: ""
  });
  const navigate = useNavigate();

  const AlertBoxAction = () => {
    if (isAlertOpen.type === "Changed") {
      UpdateBankAccountSecondaryToPrimary(isAlertOpen.id);
      setisAlertOpen({ open: false, type: "", id: "", title: "" });
    } else {
      deleteBankAccount(isAlertOpen.id);
      setisAlertOpen({ open: false, type: "", id: "", title: "" });
    }
  };
  useEffect(() => {
    if (profileDetails?.status?.kycVerified) {
      navigate("/user", {
        state: { currentTab: USER_SETTING_TABS.USER_VERIFICATION }
      });
    }
  }, []);

  const showBankAccount = () => {
    if (getBankDetails?.bankAccounts?.length > 0) {
      return getBankDetails?.bankAccounts.map((item: BankAccountType, index: number) => {
        return (
          <Grid key={index} item container display={"flex"} flexDirection={"row"}>
            <BankAccountDetails UpdateBankAccountSecondaryToPrimary={UpdateBankAccountSecondaryToPrimary} deleteBankAccount={deleteBankAccount} item={item} />
          </Grid>
        );
      });
    } else {
      return (
        <>
          <Grid item xs={12}>
            <TextView variant="SemiBold_20" text={" No Bank account"} component={"h1"} />
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      <Grid container gap={6} px={13} py={3}>
        <Grid item xs={12}>
          <HeaderComponent
            heading={"Account/Bank Verification"}
            subHeading={"Bank Verification"}
            tagLine={"Verify your bank details. In case of any issue please retry again after few minutes or contact"}
            LinkButton={"Support"}
          />
        </Grid>

        <Grid item container gap={4} xs={12}>
          {showBankAccount()}
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={() => {
              setisBankVeriOpen(true);
            }}
            variant={"secondary"}
            sx={{ maxWidth: "260px", maxHeight: "48px" }}
          >
            <TextView component={"span"} variant="Medium_32" text=" + " style={{ pr: "10px", pb: "3px" }} />
            <TextView component={"span"} variant="Medium_16" text="Add Bank Account" />
          </Button>
        </Grid>
      </Grid>
      <BankVerificationModal IsOpen={isBankVeriOpen} action={AddBankAccount} handelClose={() => setisBankVeriOpen(false)} />

      <AlertModal
        IsOpen={isAlertOpen.open}
        type={isAlertOpen.type}
        title={isAlertOpen.title}
        handelClose={() => {
          setisAlertOpen({ open: false, type: "", id: "" });
        }}
        primaryAction={AlertBoxAction}
      />

      <StatusModal
        loader={isLoader}
        IsOpen={isLoader.open}
        type={isLoader.type}
        title={isLoader.title}
        primaryMessage={isLoader.primaryMessage}
        secondaryMessage={isLoader.secondaryMessage}
        close={() =>
          SETISLOADER({
            ...isLoader,
            open: false,
            id: "",
            title: "",
            workflowRunId: ""
          })
        }
      />
    </>
  );
};

export default AccountVerification;
