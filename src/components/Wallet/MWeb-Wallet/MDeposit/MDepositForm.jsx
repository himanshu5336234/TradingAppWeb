import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DepositBlogThumbNail from "ASSETS/images/wallet/DepositThumbnail.webp";

import DepositModal from "../../Deposit/Content/DepositModal";
import DepositReferenceCard from "../../Deposit/Content/DepositReferenceCard";
import MEnterAmount from "./MEnterAmount";
const MDepositForm = ({
  formData,
  helperText,
  setFormData,
  densityBankAccount,
  PrimaryAction,
  dontShowModalAgain,
  setDontShowModalAgain,
  depositModalPrimaryAction,
  openDepositModal,
  setOpenDepositModal,
  handleAmtSubmit
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12}>
              <MEnterAmount
                handleAmtSubmit={handleAmtSubmit}
                setOpenDepositModal={setOpenDepositModal}
                formData={formData}
                helperText={helperText}
                setFormData={setFormData}
                densityBankAccount={densityBankAccount}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} marginY={1}>
          <Typography variant="SemiBold_16" component={"h2"} sx={{ marginY: 2 }}>
            {"Need Help ?"}
          </Typography>
          <Grid container gap={4}>
            <Grid item xs={12} md={4.2}>
              {/* TODO: Map required content here  */}
              <DepositReferenceCard
                link={"https://density.exchange/blogs/10"}
                imgUrl={DepositBlogThumbNail}
                buttonText={"Read Blogs"}
                cardHeading={"Density Blogs"}
                cardSubHeading={"Got doubts on NEFT & IMPS Transfer? Take a look at our blogs!"}
              />
            </Grid>
            <Grid item xs={12} md={4.2}>
              <DepositReferenceCard
                link={"https://youtu.be/1HORr2mIQ0w"}
                imgUrl={DepositBlogThumbNail}
                buttonText={"Watch Video"}
                cardHeading={"Youtube Video"}
                cardSubHeading={"Need a detailed video on how to deposit? Take a video tour"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DepositModal
        setDontShowModalAgain={setDontShowModalAgain}
        dontShowModalAgain={dontShowModalAgain}
        setOpenDepositModal={setOpenDepositModal}
        openDepositModal={openDepositModal}
        depositModalPrimaryAction={depositModalPrimaryAction}
        densityBankAccount={densityBankAccount}
      />
    </>
  );
};

MDepositForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.object,
  helperText: PropTypes.object,
  densityBankAccount: PropTypes.object,
  PrimaryAction: PropTypes.func,
  setDontShowModalAgain: PropTypes.func,
  dontShowModalAgain: PropTypes.bool,
  setOpenDepositModal: PropTypes.func,
  openDepositModal: PropTypes.bool,
  depositModalPrimaryAction: PropTypes.func,
  handleAmtSubmit: PropTypes.func
};

export default MDepositForm;
