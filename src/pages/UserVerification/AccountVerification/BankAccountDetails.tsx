import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import DeleteModal from "./DeleteModal";
import PrimaryModal from "./PrimaryModal";
import Delete from "ASSETS/images/userVerification/bankVerificaton/DeleteIcon.svg";
import primary from "ASSETS/images/userVerification/bankVerificaton/Primary.svg";
import Eye from "@/assets/images/Walletimages/Eye.svg";
import EyesHideIcon from "@/assets/images/Walletimages/EyesHideIcon.svg";
import PropTypes from "prop-types";
interface BankAccountType {
  id: string;
  isPrimary: boolean;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branchName: string;
}

interface ComponentProps {
  item: BankAccountType;
  UpdateBankAccountSecondaryToPrimary: () => void;
  deleteBankAccount: () => void;
}

const BankAccountDetails: React.FC<ComponentProps> = ({ item, UpdateBankAccountSecondaryToPrimary, deleteBankAccount }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [primaryModal, setPrimaryModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const getAccountNumber = () => {
    if (showAccount) {
      return item.accountNumber;
    }
    return "XXXXXXXXXX" + item.accountNumber.substr(-4);
  };

  return (
    <>
      <Grid
        item
        flex={1}
        sx={{
          pt: 3,
          pl: 3,
          pb: 2,
          position: "relative",
          border: "1px solid",
          borderColor: "background.tertiary",
          borderRadius: "8px 0px 0px 8px"
        }}
      >
        {item.isPrimary === true && <Box sx={{ position: "absolute", top: 0, left: 0 }} component={"img"} src={primary} />}

        <TextView component={"h4"} variant="Medium_14" text="Account Holder Name" color="text.secondary" />
        <TextView style={{ pt: "10px" }} component={"p"} variant="Medium_16" text={item.accountHolderName} />
      </Grid>
      <Grid
        item
        flex={1}
        sx={{
          pt: 3,
          pl: 3,
          pb: 2,
          border: "1px solid",
          borderColor: "background.tertiary"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <TextView component={"h4"} variant="Medium_14" text="Account Number" color="text.secondary" />
          {showAccount ? (
            <img src={Eye} onClick={() => setShowAccount(false)} style={{ cursor: "pointer" }} />
          ) : (
            <img src={EyesHideIcon} onClick={() => setShowAccount(true)} style={{ cursor: "pointer" }} />
          )}
        </Box>
        <TextView component={"p"} variant="Medium_16" text={getAccountNumber()} style={{ pt: "10px" }} />
      </Grid>
      <Grid
        item
        flex={1}
        sx={{
          pt: 3,
          pl: 3,
          pb: 2,
          border: "1px solid",
          borderRadius: "0px 8px 8px 0px",

          borderColor: "background.tertiary"
        }}
      >
        <TextView component={"h4"} color={"text.secondary"} variant="Medium_14" text="IFSC Code" />
        <TextView component={"p"} variant="Medium_16" text={item.ifsc} style={{ pt: "10px" }} />
      </Grid>
      <Grid
        flex={1}
        sx={{
          pt: 3,
          pl: 3,
          pb: 2
        }}
        item
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {!item.isPrimary && (
            <TextView
              onClick={() => setPrimaryModal(true)}
              component={"p"}
              variant="Bold_14"
              style={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
              text="Set as Primary"
            />
          )}
          {!item.isPrimary && <Box component="img" src={Delete} sx={{ cursor: "pointer" }} onClick={() => setDeleteModal(true)} />}
        </Box>
      </Grid>
      <PrimaryModal IsOpen={primaryModal} primaryAction={() => UpdateBankAccountSecondaryToPrimary(item.id, setPrimaryModal)} close={() => setPrimaryModal(false)} />

      <DeleteModal IsOpen={deleteModal} primaryAction={() => deleteBankAccount(item.id, setDeleteModal)} close={() => setDeleteModal(false)} />
    </>
  );
};
BankAccountDetails.propTypes = {
  item: PropTypes.object,
  deleteBankAccount: PropTypes.func.isRequired,
  UpdateBankAccountSecondaryToPrimary: PropTypes.func.isRequired
};

export default BankAccountDetails;
