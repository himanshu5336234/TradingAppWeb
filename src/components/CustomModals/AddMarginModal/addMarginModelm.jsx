import React from "react";

import PropTypes from "prop-types";

import { Box, Button, Drawer, Grid, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";

// import { addRemoveMarginApi } from "../../frontend-api-service/Api";

import { BORDERBOTTOM, header, TOGGLEBUTTONWRAPPER } from "./AddMarginModelm.style";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import { useAddRemoveMargin } from "@/frontend-BL/businessHooks";
const ADDMARGIN = "Add Margin";
const REMOVEMARGIN = "Remove Margin";
const AddMarginModalm = ({ isOpen, close, symbol }) => {
  const {
    selectedDropDownValue,
    setSelectedDropDownValue,
    helperText,
    setHelperText,
    estimatedLiquidationPrice,
    handleSubmitForMarginChange,
    marginValue,
    setMarginValue,
    marginUsed,
    maximumMarginPermissible
  } = useAddRemoveMargin({ symbol, close });

  return (
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          // height: 500,
          padding: "10px",
          backgroundColor: "background.default",
          overflowY: "hidden",
          backgroundImage: "none"
        }
      }}
      anchor="bottom"
      open={isOpen}
      onClose={close}
    >
      <Box>
        <Box sx={header}>
          <Typography variant="h4" sx={[{ fontSize: "22px" }, BORDERBOTTOM]}>
            {selectedDropDownValue}
          </Typography>
        </Box>
        <form onSubmit={(event) => handleSubmitForMarginChange(event)}>
          <Grid sx={{ mt: "25px" }} justifyContent="center" gap={"20px"} container>
            <Grid container gap={"5px"}>
              <Grid xs={12} item display="flex" alignItems={"center"} justifyContent={"space-between"}>
                <Typography>Margin Used for {symbol} position</Typography>
                <Typography color="text.main">{marginUsed && parseFloat(marginUsed).toFixed(2)}</Typography>
              </Grid>

              <Grid xs={12} item display="flex" alignItems={"center"} justifyContent={"space-between"}>
                {selectedDropDownValue === ADDMARGIN ? <Typography>Maximum Addable Margin</Typography> : <Typography>Maximum Removable Margin</Typography>}{" "}
                <Typography color="text.main">{maximumMarginPermissible}</Typography>
              </Grid>

              <Grid xs={12} item display="flex" alignItems={"center"} justifyContent={"space-between"}>
                <Typography>Estimated Liquidation Price after Margin Modification</Typography>
                <Typography color="text.main">{(typeof estimatedLiquidationPrice === "number" && parseFloat(estimatedLiquidationPrice).toFixed(2)) || "-"}</Typography>
              </Grid>
            </Grid>

            <Box sx={TOGGLEBUTTONWRAPPER}></Box>
            <Grid item xs={5.5}>
              <Button variant={selectedDropDownValue === ADDMARGIN ? "primary" : "secondary"} onClick={() => setSelectedDropDownValue(ADDMARGIN)} fullWidth>
                Add
              </Button>
            </Grid>

            <Grid item xs={5.5}>
              <Button variant={selectedDropDownValue === ADDMARGIN ? "secondary" : "primary"} onClick={() => setSelectedDropDownValue(REMOVEMARGIN)} fullWidth>
                Remove
              </Button>
            </Grid>
            <Grid xs={12}>
              <InputLabel sx={{ color: "text.primary" }}>Amount (USDT)</InputLabel>
              <BasicTextFields
                fullWidth
                helperText={helperText}
                error={!!helperText}
                value={marginValue}
                onChange={(event) => {
                  setMarginValue(event.target.value);
                  setHelperText("");
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                variant="outlined"
                type="number"
              />
            </Grid>

            <Grid xs={12}>
              <Button id="confirm-button" variant="primary" fullWidth type="submit">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
};

AddMarginModalm.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  symbol: PropTypes.string
};

export default AddMarginModalm;
