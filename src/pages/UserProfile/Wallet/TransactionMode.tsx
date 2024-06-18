import TextView from "@/components/UI/TextView/TextView";
import { Box, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { TRANSACTIONMODE_BOX, TRANSACTION_CARD } from "./styles";
import WithdrawMethod from "../../../components/NewWallet/WithDrawMethod";
import CustomButton from "@/components/UI/CustomButton/CustomButton";

const TransactionMode = ({
  paymentMethod,
  setPaymentMethod,
  paymentType,
  setPaymentType,
  action,
  formData
}: {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  paymentType: string;
  setPaymentType: (val: string) => void;
  action: () => void;
  formData: any;
}) => {
  console.log(formData, "d");
  const feeText = paymentType === "NEFT" ? "₹ 5.90" : paymentType === "IMPS" ? (Number(formData.WithdrawAmount) > 25000 ? "₹ 11.80" : "₹ 5.90") : "";
  return (
    <Box sx={{ ...TRANSACTIONMODE_BOX, gap: "40px" }}>
      <TextView variant="Bold_28" text={"Choose Mode of Withdrawal"} />
      <Box sx={{ ...TRANSACTIONMODE_BOX }}>
        <WithdrawMethod isChecked={paymentMethod === "manual"} setPaymentMethod={() => setPaymentMethod("manual")} method="manual" />
        <WithdrawMethod isChecked={paymentMethod === "instant"} setPaymentMethod={() => setPaymentMethod("instant")} method="instant" />
        {paymentMethod === "instant" && (
          <Box sx={TRANSACTION_CARD}>
            <Box sx={{ ...TRANSACTIONMODE_BOX, gap: "24px", width: "40%" }}>
              <TextView color={"text.quaternary"} variant="Medium_12" text={"Please select one to continue "} />
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: "40px", alignSelf: "stretch" }}>
                <Box sx={{ ...TRANSACTIONMODE_BOX, gap: "16px", flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "white"
                      }
                    }}
                    checked={paymentType === "IMPS"}
                    onChange={() => {
                      setPaymentType("IMPS");
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                    <TextView variant="Medium_16" text={"IMPS"} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <TextView color={"text.quaternary"} variant="Regular_12" text={"Up to 10 min"} />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ ...TRANSACTIONMODE_BOX, gap: "16px", flexDirection: "row", alignItems: "center" }}>
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "white"
                      }
                    }}
                    checked={paymentType === "NEFT"}
                    onChange={() => {
                      setPaymentType("NEFT");
                    }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                    <TextView variant="Medium_16" text={"NEFT"} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <TextView color={"text.quaternary"} variant="Regular_12" text={"Up to 1 hour"} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              {feeText && (
                <Box
                  sx={{
                    borderRadius: "4px",
                    Padding: "4px 8px",
                    background: "linear-gradient(224.72deg, rgba(226, 255, 111, 0.14) -8.3%, rgba(54, 208, 104, 0) 269.11%)",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <TextView color={"text.quaternary"} variant="Regular_10" text={` ${feeText} will be deducted from your entered withdrawal amount `} />
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", alignSelf: "stretch", width: "50%" }}>
              <Box
                sx={{
                  padding: "8px 10px",
                  background: "#1B1B1F",
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "stretch",
                  textAlign: "center",
                  gap: "10px",
                  justifyContent: "space-between"
                }}
              >
                <TextView color={"text.quaternary"} variant="Medium_12" text={"FEE CHART"} />
                <TextView color={"text.quaternary"} variant="Regular_10" text={"(18% GST Applicable On Fees)"} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  alignSelf: "stretch"
                  // border: "1px solid #383840"
                }}
              >
                <Box sx={{ width: "20%", height: "100px", border: "1px solid #383840", borderBottom: "none", borderRight: "none" }}></Box>
                <Box sx={{ width: "60%", height: "100px" }}>
                  <Box
                    sx={{
                      padding: "8px 10px",
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "stretch",
                      textAlign: "center",
                      border: "1px solid #383840",
                      gap: "10px",
                      borderBottom: "none",
                      borderRight: "none"
                    }}
                  >
                    <TextView color={"text.white"} variant="Bold_14" text={"IMPS"} />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box
                      sx={{
                        padding: "8px 10px",
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "stretch",
                        textAlign: "center",
                        border: "1px solid #383840",
                        width: "50%",
                        height: "62px",
                        borderBottom: "none",
                        borderRight: "none",
                        justifyContent: "center"
                      }}
                    >
                      <TextView color={"text.quaternary"} variant="Regular_14" text={"upto ₹ 25k"} />
                    </Box>
                    <Box
                      sx={{
                        padding: "8px 10px",
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "stretch",
                        textAlign: "center",
                        border: "1px solid #383840",
                        width: "50%",
                        borderBottom: "none",
                        borderRight: "none",
                        justifyContent: "center"
                      }}
                    >
                      <TextView color={"text.quaternary"} variant="Regular_14" text={"above ₹ 25k"} />
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{ width: "20%", height: "100px", border: "1px solid #383840", padding: "8px 10px", borderBottom: "none", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <TextView color={"text.white"} variant="Bold_14" text={"NEFT"} />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  // border: "1px solid #383840",
                  width: "100%",
                  height: "50px"
                }}
              >
                <Box
                  sx={{
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    textAlign: "center",
                    border: "1px solid #383840",
                    width: "20%",
                    flexDirection: "column",
                    borderRight: "none"
                  }}
                >
                  <TextView color={"text.quaternary"} variant="Regular_14" text={"Fees"} />
                </Box>
                <Box
                  sx={{
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                    textAlign: "center",
                    border: "1px solid #383840",
                    width: "30%",
                    borderRight: "none",
                    justifyContent: "center"
                  }}
                >
                  <TextView color={"text.white"} variant="Medium_12" text={"₹ 5"} />
                </Box>
                <Box
                  sx={{
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                    textAlign: "center",
                    border: "1px solid #383840",
                    width: "30%",
                    borderRight: "none",
                    justifyContent: "center"
                  }}
                >
                  <TextView color={"text.white"} variant="Medium_12" text={"₹ 19"} />
                </Box>
                <Box
                  sx={{
                    padding: "8px 10px",
                    display: "flex",
                    alignItems: "center",
                    alignSelf: "stretch",
                    textAlign: "center",
                    border: "1px solid #383840",
                    width: "20%",
                    justifyContent: "center"
                  }}
                >
                  <TextView color={"text.white"} variant="Medium_12" text={"₹ 5"} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <CustomButton
        style={{ width: "30%" }}
        label={"Withdraw"}
        variant={"primary"}
        onClick={() => action()}
        isDisabled={paymentMethod === "manual" ? false : paymentMethod === "instant" ? (paymentType === "IMPS" || paymentType === "NEFT" ? false : true) : true}
        isloading={false}
      />
    </Box>
  );
};

export default TransactionMode;
