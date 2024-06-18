import { Box } from "@mui/material";
import React, { useRef, useState } from "react";
import rupeeAmount from "../../../assets/images/Walletimages/rupeeAmount.svg";
import Timer from "../../../assets/images/Walletimages/TimerDepositeIcon.svg";
import BankIcon from "../../../assets/images/Walletimages/bankIcon.svg";
import DensityLogo from "../../../assets/images/Walletimages/DensityLogo.svg";
import YoutubeIcon from "../../../assets/images/Walletimages/YoutubeIcon.svg";
import StepBox from "../../../components/NewWallet/StepBox";
import WalletDepositeForm from "@/components/NewWallet/WalletDepositeForm";
import DesnityBankDetails from "../../../components/NewWallet/DesnityBankDetails";
import { useDeposit } from "@/frontend-BL/businessHooks/WALLET/useDeposit";
import ReferenceIDForm from "@/components/NewWallet/ReferenceIDForm";
import StatusComponent from "../../../components/NewWallet/StatusComponent";
import { useNavigate } from "react-router-dom";
import { USER_SETTING_TABS } from "../Constants";
import HeaderComponent from "@/pages/UserVerification/AccountVerification/HeaderComponent";
import TextView from "@/components/UI/TextView/TextView";
import NeedHelpBoxes from "../../../components/NewWallet/NeedHelpBoxes";
import PaymentMethod from "@/components/NewWallet/PaymentMethod";
import QRComponent from "../../../components/NewWallet/QRComponent";

const INRDeposite = () => {
  const needHelpRef = useRef();
  const navigate = useNavigate();

  const handlePrimaryClick = () => {
    navigate(USER_SETTING_TABS.INR_WALLET.route, {
      state: { currentTab: USER_SETTING_TABS.INR_WALLET }
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("NEFT");

  const { formData, helperText, activeStep, SecondaryAction, densityBankAccount, SETFORMDATA, handleAmtSubmit, loading } = useDeposit({
    paymentMethod
  });

  return (
    <Box>
      <HeaderComponent heading={"Asset / INR Wallet / INR Deposit"} subHeading={"INR Deposit"} tagLine={""} LinkButton={""} />
      {(activeStep === 0 || activeStep === 1) && (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "stretch",
            justifyContent: "space-between"
          }}
        >
          <Box maxWidth={"240px"} p={2}>
            <TextView variant="Bold_28" component={"div"} style={{ mb: 2 }} text={"Steps to Deposit INR"}></TextView>
            <TextView
              variant={"Bold_14"}
              onClick={() => {
                needHelpRef.current.scrollIntoView();
              }}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
              text={"Need Help ?"}
            ></TextView>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2
            }}
          >
            <StepBox icon={rupeeAmount} title={"Choose Deposit Method"} description={"Scan UPI QR or Enter an amount in IMPS/NEFT that you want to deposit"} stepNumber={1} />
            <StepBox icon={BankIcon} title={"Reference ID"} description={"Provide unique Reference ID of the transaction from your bank account"} stepNumber={2} />
            <StepBox icon={Timer} title={"Instant Transfer"} description={"Funds more than 5000 will be reflected immediately in your wallet (For IMPS/NEFT)"} stepNumber={3} />
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <StatusComponent type={"SUCCESS"} heading={"Deposit Request Successful!"} message={"Transaction will be processed within 5 mins."} handlePrimaryClick={handlePrimaryClick} />
      )}
      {activeStep === 3 && (
        <StatusComponent type={"FAILED"} heading={"Deposit Request Failed"} message={"Please retry after sometime or contact support to learn more."} handlePrimaryClick={handlePrimaryClick} />
      )}

      {activeStep === 0 && (
        <>
          <TextView
            text={"Choose Method of Deposit"}
            variant={"Bold_28"}
            component={"div"}
            style={{
              my: 4
            }}
          />
          {/* <Box mt={2}>
            <PaymentMethod method="UPI" isChecked={paymentMethod === "UPI"} setPaymentMethod={setPaymentMethod} />

            {paymentMethod === "UPI" && (
              <Box
                sx={{
                  display: "flex",
                  px: 9,
                  py: 4,
                  border: "1px #44444D solid",
                  borderRadius: "0 0 8px 8px",
                  borderTop: "none",
                  alignItems: "stretch"
                }}
              >
                <WalletDepositeForm formData={formData} setFormData={SETFORMDATA} helperText={helperText} handleAmtSubmit={handleAmtSubmit} depositType={"UPI"} />
                <QRComponent />
              </Box>
            )}
          </Box> */}
          <Box>
            <PaymentMethod method="NEFT" isChecked={paymentMethod === "NEFT"} setPaymentMethod={setPaymentMethod} />

            {paymentMethod === "NEFT" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 9,
                  py: 4,
                  border: "1px #44444D solid",
                  borderRadius: "0 0 8px 8px",
                  borderTop: "none"
                }}
              >
                <WalletDepositeForm formData={formData} setFormData={SETFORMDATA} helperText={helperText} handleAmtSubmit={handleAmtSubmit} depositType={"OTHER"} />
                <DesnityBankDetails accountDetails={densityBankAccount} />
              </Box>
            )}
          </Box>
        </>
      )}

      <Box
        mt={3}
        sx={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between"
        }}
      >
        {activeStep === 1 && (
          <ReferenceIDForm
            PrimaryAction={handleAmtSubmit}
            SecondaryAction={SecondaryAction}
            formData={formData}
            setFormData={SETFORMDATA}
            helperText={helperText}
            loading={loading}
            depositeMethod={paymentMethod}
          />
        )}
      </Box>
      <TextView variant={"Bold_28"} component={"p"} style={{ mt: 6 }} text={"Need Help?"}></TextView>
      <Box
        id="need-help"
        ref={needHelpRef}
        sx={{
          display: "flex",
          gap: 2
        }}
        mt={2}
      >
        <NeedHelpBoxes
          title={"Density Blogs"}
          imgSrc={DensityLogo}
          link={"https://blogs.density.exchange/how-to-deposit-funds-on-density/"}
          description={"Got doubts on NEFT & IMPS Transfer? Take a look at our blogs!"}
          linktext={"Read Blogs"}
          paymentMethod={paymentMethod}
        />
        <NeedHelpBoxes
          title={"Youtube Video"}
          imgSrc={YoutubeIcon}
          link={"https://youtu.be/1HORr2mIQ0w"}
          description={"Need a detailed video on how to deposit? Take a video tour."}
          linktext={"Watch Video"}
          paymentMethod={paymentMethod}
        />
      </Box>
    </Box>
  );
};

export default INRDeposite;
