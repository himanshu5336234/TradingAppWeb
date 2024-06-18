import React from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
// import TransferFund from "./TransferFund";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import NeftImg from "@/assets/images/Walletimages/NeftImage.svg";
import ImpsImg from "@/assets/images/Walletimages/IMPSImage.svg";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import TextView from "@/components/UI/TextView/TextView";

interface DepositModalProps {
  densityBankAccount?: {
    accountHolderName?: string;
    accountNumber?: string;
    ifsc?: string;
    accountType?: string;
  };
  setDontShowModalAgain: (val: boolean) => void;
  dontShowModalAgain: boolean;
  setOpenDepositModal: (val: boolean) => void;
  openDepositModal: boolean;
  depositModalPrimaryAction: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ densityBankAccount, setDontShowModalAgain, dontShowModalAgain, setOpenDepositModal, openDepositModal, depositModalPrimaryAction }) => {
  const getBox = ({ title, val, width = "100%", sx = {} }: { title: string; val: string | undefined; width?: string; sx?: any }) => {
    return (
      <Box
        p={1}
        sx={{
          ...sx,
          border: "1px solid background.primary",
          width,
          backgroundColor: "background.default"
        }}
      >
        <TextView color="text.regular" variant="Medium_11">
          {title}
          <TextView component={"div"} color="text.primary" variant="Medium_12">
            {val} <CopyButton copyText={val || ""} />
          </TextView>
        </TextView>
      </Box>
    );
  };

  return (
    <CustomModal
      title={"Available Methods of Transactions"}
      IsOpen={openDepositModal}
      close={() => setOpenDepositModal(false)}
      isClose={false}
      isPrimaryAction={true}
      primaryName={"Continue"}
      primaryAction={depositModalPrimaryAction}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40%"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              mt: 2
            }}
          >
            <TextView component={"p"} color={"text.regular"} variant="Medium_11" text={"TWO METHODS"}></TextView>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: "184px"
              }}
            >
              <img src={NeftImg} alt="NEFT" />
              <TextView variant="Regular_12">
                {`In case of`} <TextView variant="Bold_14" text={`NEFT`}></TextView> {`add beneficiary`}
              </TextView>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: "184px"
              }}
            >
              <img src={ImpsImg} alt="IMPS" />
              <TextView variant="Regular_12">
                {`In case of`} <TextView variant="Bold_14" text={`IMPS`}></TextView> {`Transfer directly`}
              </TextView>
            </Box>
          </Box>

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    width: "0px",
                    height: " 0px",
                    color: "text.regular",
                    "&:hover": {
                      backgroundColor: "transparent"
                    }
                  }}
                  checked={dontShowModalAgain}
                  onChange={(event) => setDontShowModalAgain(event.target.checked)}
                />
              }
              label="Do not show it again"
              sx={{
                mx: "0px",
                gap: "10px",
                color: "text.regular",
                fontSize: "12px",
                fontWeight: "500"
              }}
            />
          </Box>
        </Box>
        <Box width={"60%"} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box py={2} sx={{ backgroundColor: "background.primary", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
            <TextView color={"text.regular"} variant={"Medium_14"} text={"Transfer To"}></TextView>
          </Box>

          {getBox({ title: "BANK Name", val: "Equitas Bank", width: "100%", sx: { borderRadius: "4px" } })}
          {getBox({ title: "Beneficiary Entity", val: densityBankAccount?.accountHolderName, width: "100%", sx: { borderRadius: "4px" } })}
          {getBox({ title: "Beneficiary Account Number", val: densityBankAccount?.accountNumber, width: "100%", sx: { borderRadius: "4px" } })}
          <Box sx={{ display: "flex", width: "100%", gap: 0.5 }}>
            {getBox({ title: "Beneficiary IFSC", val: densityBankAccount?.ifsc, width: "50%", sx: { borderRadius: "4px 0 0 4px" } })}
            {getBox({ title: "Beneficiary Account Number", val: densityBankAccount?.accountType, width: "50%", sx: { borderRadius: "0 4px 4p 0" } })}
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
};

export default DepositModal;
