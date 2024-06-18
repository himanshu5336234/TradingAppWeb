import React, { useState } from "react";
import { Box } from "@mui/material";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import TextView from "../UI/TextView/TextView";
import screenShotUPI from "../../assets/images/Walletimages/UPI_SCREEN.svg";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
interface HelperText {
  referenceId: string;
  accountNumber: string;
  depositAmount: string;
}

interface FormData {
  referenceId: string;
  accountNumber: string;
  depositAmount: string;
}
interface ComponentProps {
  setFormData: (value: FormData) => void;
  helperText: HelperText;
  formData: FormData;
  PrimaryAction: () => void;
  SecondaryAction: () => void;
  loading: boolean;
  depositeMethod: string;
}

const ReferenceIDForm: React.FC<ComponentProps> = ({ setFormData, helperText, formData, PrimaryAction, SecondaryAction, loading, depositeMethod }) => {
  const [showScreenShot, setShowScreenShot] = useState(false);
  const myRegEx = /^[0-9]+$/;
  return (
    <Box width={"100%"}>
      <TextView component={"p"} variant="Bold_28" style={{ mt: 4 }} text={depositeMethod === "UPI" ? "Enter UPI Transaction ID(UTR ID)" : "Enter Reference ID"}></TextView>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 3
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.primary",
            width: "50%",
            borderRadius: "8px",
            p: 2,
            mt: 3,
            gap: 3
          }}
        >
          <BasicTextFields
            styles={{ mb: 2 }}
            label={depositeMethod === "UPI" ? "UPI Transacti on ID (UTR ID)" : "Enter Reference ID"}
            type={"text"}
            onFocus={(e) =>
              e.target.addEventListener(
                "wheel",
                function (e: any) {
                  e.preventDefault();
                },
                { passive: false }
              )
            }
            placeholder={depositeMethod === "UPI" ? "Enter UPI Transaction ID" : "123456789"}
            variant="outlined"
            value={formData.referenceId}
            onChange={(event) => {
              if (depositeMethod === "UPI") {
                if (myRegEx.test(event.target.value) && event.target.value.length <= 12) {
                  setFormData({ ...formData, referenceId: event.target.value });
                } else if (event.target.value === "") {
                  setFormData({ ...formData, referenceId: "" });
                }
              } else {
                setFormData({ ...formData, referenceId: event.target.value });
              }
            }}
          />
          <TextView
            variant={"Medium_11"}
            component={"p"}
            onClick={() => {
              setShowScreenShot(true);
              recordCleverTapEvent("REF_ID_INFO_CLICKED", {
                paymentMode: depositeMethod
              });
            }}
            style={{
              mt: 1,
              mb: 4,
              textDecoration: "underline",
              cursor: "pointer",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px"
            }}
          >
            <TextView component={"p"} style={{ p: 1 }} variant="Regular_14" color={"text.error"} text={helperText?.referenceId}></TextView>
            {depositeMethod === "UPI" ? "What is UPI Transaction ID(UTR ID)" : "What is Reference ID?"}
          </TextView>
          <BasicTextFields label={"Deposit Amount"} backgroundColor={"background.secondary"} type={"number"} placeholder={formData?.depositAmount} disabled={true} />

          <Box width={"50%"} mt={6} mb={4} gap={2} display={"flex"}>
            <CustomButton label={"Previous"} variant={"secondary"} onClick={SecondaryAction} isDisabled={loading} isloading={loading} />
            <CustomButton label={"Continue"} variant={"primary"} isDisabled={formData.referenceId === "" || helperText?.referenceId !== "" || loading} onClick={PrimaryAction} isloading={loading} />
          </Box>
        </Box>
        {showScreenShot && (
          <Box
            width={"45%"}
            sx={{
              display: "flex",
              // alignSelf: "center",
              flexDirection: "column",
              height: "100%"
              // justifyContent: "center"
            }}
          >
            <Box
              onClick={() => setShowScreenShot(false)}
              sx={{
                width: "100%",
                height: "27px",
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer",
                alignSelf: "flex-start",
                mb: depositeMethod !== "UPI" && 2
              }}
            >
              <TextView style={{ m: " auto" }}>&#x2715; </TextView>
            </Box>
            <img
              style={{ maxHeight: "390px", maxWidth: "600px" }}
              src={depositeMethod === "UPI" ? screenShotUPI : "https://blog.talkcharge.com/wp-content/uploads/2020/05/HDFC-Bank-Statement-with-UTR-no..png"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReferenceIDForm;
