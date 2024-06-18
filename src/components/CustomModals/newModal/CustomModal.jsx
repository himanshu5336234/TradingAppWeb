import React from "react";
import { Typography, Box, Modal, Container, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import { BUTTONWRAPPER, CONTIANER, PRIMARYBUTTON, SECONDARYBUTTON, SPACE_BETWEEN } from "./Style";
import CustomButton from "../../UI/CustomButton/CustomButton";
import CustomDivider from "@/components/UI/Divider/CustomDivider";

const CustomModal = ({
  IsOpen,
  titleChild,
  loading,
  ContainerSx,
  isSecondaryAction,
  TitleSx,
  isPrimaryAction,
  isClose,
  close,
  primaryName,
  primaryAction,
  secondaryName,
  isDisabled,
  isloading,
  secondaryAction,
  title,
  children,
  primaryDisabled,
  primaryButtonSX,
  secondaryButtonSX,
  paddingSX
}) => {
  return (
    <Modal open={IsOpen} onClose={close}>
      <Container sx={[{ ...CONTIANER, ...ContainerSx }]}>
        <Box sx={paddingSX || { p: 3.1 }}>
          {/* <Box> */}
          <Box sx={SPACE_BETWEEN}>
            <Typography component={"h1"} variant="Medium_16" sx={TitleSx}>
              {title}
              <Typography component={"span"} variant={"Regular_10"}>
                {titleChild}
              </Typography>
            </Typography>

            {isClose === true && (
              <Box
                onClick={close}
                sx={{
                  position: "absolute",
                  right: "-15px",
                  top: "-15px",
                  width: "30px",
                  height: "27px",
                  backgroundColor: "background.primary",
                  borderRadius: "4px",
                  boxShadow: " 6px 8px 8px 0px #0000008F",
                  border: "0.5px solid",
                  borderColor: "text.tertiary",
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer"
                }}
              >
                <Typography sx={{ m: " auto" }}>&#x2715;</Typography>
              </Box>
            )}
          </Box>

          {children}
        </Box>
        {(isPrimaryAction || isSecondaryAction) && (
          <>
            <CustomDivider />
            <Box maxWidth="md" sx={BUTTONWRAPPER}>
              {isSecondaryAction && <CustomButton id={"secondary-btn-confirm"} variant={"secondary"} style={secondaryButtonSX || SECONDARYBUTTON} onClick={secondaryAction} label={secondaryName} />}

              {isPrimaryAction && !loading && (
                <CustomButton
                  id={"primary-btn"}
                  variant={"primary"}
                  isDisabled={primaryDisabled || isDisabled}
                  isloading={isloading}
                  style={primaryButtonSX || PRIMARYBUTTON}
                  onClick={primaryAction}
                  label={primaryName}
                  loadingTextDisable={true}
                />
              )}

              {loading && <CircularProgress />}
            </Box>
          </>
        )}
      </Container>
    </Modal>
  );
};

CustomModal.propTypes = {
  IsOpen: PropTypes.bool,
  close: PropTypes.func,
  primaryName: PropTypes.string,
  primaryAction: PropTypes.func,
  isClose: PropTypes.bool,
  isPrimaryAction: PropTypes.bool,
  isSecondaryAction: PropTypes.bool,
  secondaryName: PropTypes.string,
  secondaryAction: PropTypes.func,
  title: PropTypes.string,
  titleChild: PropTypes.string,
  children: PropTypes.any,
  TitleSx: PropTypes.object,
  ContainerSx: PropTypes.object,
  primaryDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  secondaryButtonSX: PropTypes.object,
  primaryButtonSX: PropTypes.object,
  isloading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  paddingSX: PropTypes.object
};

export default CustomModal;
