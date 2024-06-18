import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Box, CircularProgress } from "@mui/material";
// import QRgenerator from "@/components/UI/AnnouncementBar/QRgenerator";
import LoaderLogo from "ASSETS/images/gradient_loader.png";
import StatusFail from "ASSETS/images/SnackbarImages/Error.svg";
import DoneIcon from "ASSETS/images/StatusImages/StatusSuccess.svg";
import WarningImage from "ASSETS/images/SnackbarImages/Warning.svg";
import "./Style.css";
import { CENTER_TEXT, STATUS_MODAL_WRAPPER_TYPE_1 } from "./Style";
import CustomModal from "./CustomModal";
import TextView from "@/components/UI/TextView/TextView";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
const OpenWindowsNewTab = [
  `toolbar=no,
location=no,
status=no,
menubar=no,
scrollbars=yes,
resizable=yes,
width=SomeSize,
height=SomeSize`
];
interface StatusModalProp {
  loader: {
    workflowRunId: string;
    remarks: string;
  };
  IsOpen: boolean;
  close: () => void;
  type: string;
  title: string;
  primaryMessage: string;
  secondaryMessage: string;
  mainMessage: string;
}
const StatusModal = ({ loader, IsOpen, close, type, title, primaryMessage, secondaryMessage, mainMessage }: StatusModalProp) => {
  const [Close, SetClose] = useState(false);
  const [LOADER, SetLoader] = useState(false);
  const handleOpenSDK = () => {
    SetLoader(true);
    window.open(`https://eu.onfido.app/l/${loader.workflowRunId}`, "targetWindow", OpenWindowsNewTab[0]);
  };
  useEffect(() => {
    if (!["AWAITING_INPUT", "loading"].includes(type)) {
      SetClose(true);
    }
  }, [type]);

  const ShowContent = (TYPE: string) => {
    switch (TYPE) {
      case "IN_PROGRESS":
      case "AWAITING_INPUT":
      case "PENDING": {
        return (
          <Grid container justifyContent={"center"} rowSpacing={2}>
            <Grid item xs={2}>
              <div className="rounded">
                <img style={{ width: "100%" }} src={LoaderLogo} alt="logo" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextView variant="Medium_22" component={"h2"} style={CENTER_TEXT}>
                {"  Your "}
                {title} {"verification is in Progress"}
              </TextView>
            </Grid>
            <Grid item xs={12}>
              <TextView component={"p"} variant="Medium_14" color={"text.quaternary"} text={"It might take upto 5 minutes .Please Do not refresh the page."} style={CENTER_TEXT}></TextView>
            </Grid>
          </Grid>
        );
      }
      case "long": {
        return (
          <Grid container justifyContent={"center"} rowSpacing={2}>
            <Grid item xs={2}>
              <img style={{ width: "100%" }} src={WarningImage} alt="logo" />
            </Grid>
            <Grid item xs={12}>
              <TextView variant="Medium_22" component={"h2"} style={CENTER_TEXT}>
                {"Your"} {title} {"verification in review."}
              </TextView>
            </Grid>
            <Grid item xs={11}>
              <TextView style={CENTER_TEXT} component={"p"} variant="Medium_14" text={"It can take upto 30 minutes to update the status. "} color={"text.quaternary"} />
            </Grid>
          </Grid>
        );
      }
      case "FAILED": {
        return (
          <>
            <Box component={"img"} width={"100px"} src={StatusFail} />
            <TextView variant="Medium_22" component={"h2"} style={CENTER_TEXT}>
              {"We are currently unable to verify your"} {title} !
            </TextView>
            <TextView style={CENTER_TEXT} variant="Medium_14" color={"text.quaternary"} text={loader?.remarks} />
          </>
        );
      }
      case "VERIFIED": {
        return (
          <>
            <Box component={"img"} src={DoneIcon} />
            <TextView text={primaryMessage} variant="Medium_22" component={"h2"} style={CENTER_TEXT} />
            <TextView text={secondaryMessage} variant="Medium_14" color={"text.quaternary"} style={CENTER_TEXT} />
          </>
        );
      }
      case "SUCCESS": {
        return (
          <>
            <Box component={"img"} src={DoneIcon} />
            {primaryMessage && <TextView text={primaryMessage} variant="Medium_22" style={CENTER_TEXT} component={"h2"} />}
            {mainMessage && <TextView text={mainMessage} variant="SemiBold_20" style={[CENTER_TEXT]} />}
            <TextView text={secondaryMessage} variant="Medium_14" color={"text.quaternary"} style={CENTER_TEXT} />
          </>
        );
      }
      case "loading": {
        return (
          <Grid container justifyContent={"center"} rowSpacing={2}>
            <Grid item xs={2}>
              <div className="rounded">
                <img style={{ width: "100%" }} src={LoaderLogo} alt="" />
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextView text={`Verifying  ${title}`} variant="Medium_22" component={"h2"} style={CENTER_TEXT} />
            </Grid>
            <Grid item xs={12}>
              <TextView style={CENTER_TEXT} component={"p"} variant="Medium_14" text={"Please wait your request is being processed."} color={"text.quaternary"} />
              <TextView style={CENTER_TEXT} component={"p"} variant="Medium_14" text={"It may take some time."} color={"text.quaternary"} />
            </Grid>
          </Grid>
        );
      }
      case "loading2": {
        return (
          <>
            <TextView variant="Medium_22" component={"h2"} style={CENTER_TEXT}>
              {title} Verification !
            </TextView>

            <Box sx={{ width: "100px", height: "100px", my: 3 }}>{/* <QRgenerator Url={`https://eu.onfido.app/l/${loader.workflowRunId}`} /> */}</Box>
            <TextView variant="Medium_12" component={"p"} text="Scan this QR Code to complete Selfie verification.QR code is valid for 5 minutes" style={CENTER_TEXT} />

            {!LOADER && <CustomButton label={"Continue with WEB"} variant="primary" onClick={() => handleOpenSDK()} />}
            {LOADER && <CircularProgress sx={{ backgroundColor: "#1f1f24" }} />}
          </>
        );
      }
      default:
        return (
          <>
            <TextView text={`    ${title} Something went wrong !`} variant="Medium_22" component={"h2"} style={CENTER_TEXT} />
          </>
        );
    }
  };

  return (
    <CustomModal ContainerSx={{ maxWidth: { xs: "500px" } }} IsOpen={IsOpen} isClose={Close} secondaryAction={close} close={close}>
      <Box sx={[STATUS_MODAL_WRAPPER_TYPE_1]}> {ShowContent(type)}</Box>
    </CustomModal>
  );
};

StatusModal.propTypes = {
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  type: PropTypes.string,
  mainMessage: PropTypes.string,
  loader: PropTypes.object,
  title: PropTypes.string,
  primaryMessage: PropTypes.string,
  secondaryMessage: PropTypes.string,
  toggleIsSupportChatVisible: PropTypes.func,
  isSupportChatVisible: PropTypes.bool
};

export default memo(StatusModal);
