import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import { ESTIMATED_LIQUIDATION_PRICE, MAX_ADDABLE_MARGIN, MAX_REMOVABLE_MARGIN, CURR_MARGIN } from "./AddMarginModalConstants";

import { useAddRemoveMargin } from "BL/businessHooks";
import CustomModal from "../newModal/CustomModal";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";

const AddMarginModal = ({ isOpen, close, symbol }) => {
  const { selectedDropDownValue, handleMargin, setSelectedDropDownValue, helperText, estimatedLiquidationPrice, handleSubmitForMarginChange, marginValue, marginUsed, maximumMarginPermissible } =
    useAddRemoveMargin({ symbol, close });

  return (
    <CustomModal
      IsOpen={isOpen}
      ContainerSx={{ maxWidth: { sm: "460px", xs: "350px" } }}
      isClose={true}
      close={close}
      primaryName={"Confirm"}
      isPrimaryAction={true}
      primaryAction={handleSubmitForMarginChange}
      isSecondaryAction={true}
      secondaryName={"Dismiss"}
      secondaryAction={close}
    >
      {selectedDropDownValue === "Add" ? (
        <Typography component={"p"} variant={"Medium_16"}>
          {"Add Margin"}
          {" - "}
          <Typography component={"span"} color={"text.quaternary"}>
            {symbol}
          </Typography>
          <Typography component={"span"} variant={"Medium_11"} sx={{ marginLeft: "5px", color: "text.quaternary" }}>
            {"   Isolated"}
          </Typography>
        </Typography>
      ) : (
        <Typography component={"p"} variant={"Medium_16"}>
          {"Remove Margin"} {" - "}
          <Typography component={"span"} color={"text.quaternary"}>
            {symbol}
          </Typography>
          <Typography component={"span"} variant={"Medium_11"} color={"text.quaternary"}>
            {"  Isolated"}
          </Typography>
        </Typography>
      )}
      <Grid xs={3} sx={{ marginTop: "28px" }}>
        <ToggleGroup
          variant="secondary"
          value={selectedDropDownValue}
          handleChange={(event, value) => {
            if (value !== null) {
              setSelectedDropDownValue(value);
            } else {
              setSelectedDropDownValue(selectedDropDownValue);
            }
          }}
          values={[
            { name: "Add", value: "Add" },
            { name: "Remove", value: "Remove" }
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ marginTop: "12px" }}>
          <>
            <BasicTextFields
              id="margin-input"
              InputProps={{ id: "positionModal-Margini-Input" }}
              styles={{ my: 0.3 }}
              Error={helperText.length > 0}
              label={"Enter Margin"}
              backgroundColor={"background.default"}
              type="number"
              value={marginValue}
              onChange={handleMargin}
              placeholder={"0.00"}
            />
          </>
          {helperText.length > 0 && (
            <Typography variant="Medium_12" color={"text.error"}>
              {helperText}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            marginTop: "18px"
          }}
        >
          <Box id="current-margin">
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {CURR_MARGIN}
            </Typography>
            <Typography component={"h5"} variant={"Medium_12"}>
              {marginUsed && parseFloat(marginUsed).toFixed(2)}
              {" USDT "}
            </Typography>
          </Box>
          <Box>
            {selectedDropDownValue === "Add" ? (
              <Typography id="max-addable-margin" component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
                {MAX_ADDABLE_MARGIN}
              </Typography>
            ) : (
              <Typography id="max-removable-margin" component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
                {MAX_REMOVABLE_MARGIN}
              </Typography>
            )}
            <Typography component={"h5"} variant={"Medium_12"}>
              {" "}
              {maximumMarginPermissible}
              {" USDT "}
            </Typography>
          </Box>
          <Box>
            <Typography component={"h5"} variant={"Medium_10"} color={"text.secondary"}>
              {ESTIMATED_LIQUIDATION_PRICE}
            </Typography>
            <Typography component={"h5"} variant={"Medium_12"}>
              {(typeof estimatedLiquidationPrice === "number" && parseFloat(estimatedLiquidationPrice).toFixed(2)) || "-"}
              {" USDT "}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </CustomModal>
  );
};

AddMarginModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  symbol: PropTypes.string
};

export default AddMarginModal;
