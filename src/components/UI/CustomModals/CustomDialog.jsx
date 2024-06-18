import * as React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function CustomDialog({ dialogTitle, dialogContent, dialogActionName, dialogActionHandler, dialogContext, dialogType, handleIsOpenDialog, isOpenDialog, dialogActionDefault }) {
  React.useEffect(() => {
    // insert styling logic here based on the "dialogType prop"
    // Create a state variable for sx and apply it to JSX
  }, [isOpenDialog]);

  const handleClose = () => {
    handleIsOpenDialog(false);
    dialogActionDefault();
  };

  const handleDialogAction = () => {
    dialogActionHandler();
    handleIsOpenDialog(false);
    dialogActionDefault();
  };

  CustomDialog.propTypes = {
    dialogTitle: PropTypes.string,
    dialogContent: PropTypes.string,
    dialogActionName: PropTypes.string,
    dialogActionHandler: PropTypes.func,
    dialogContext: PropTypes.object,
    dialogType: PropTypes.string,
    handleIsOpenDialog: PropTypes.func.isRequired,
    isOpenDialog: PropTypes.bool.isRequired,
    dialogActionDefault: PropTypes.func.isRequired
  };

  CustomDialog.defaultProps = {
    dialogTitle: "",
    dialogContent: "An unexpected error has occured. Please try again!",
    dialogActionHandler: handleClose,
    dialogActionName: "Close",
    dialogContext: {},
    dialogType: "default",
    isOpenDialog: false
  };

  return (
    <Grid>
      <Dialog onClose={handleClose} open={isOpenDialog}>
        <BootstrapDialogTitle onClose={handleClose}>{dialogTitle}</BootstrapDialogTitle>
        <DialogContent>
          <Typography gutterBottom>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogAction}>{dialogActionName}</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
