import React, { useState } from "react";
import { Box, Grid, InputAdornment, FormControlLabel, Checkbox } from "@mui/material";

import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TextView from "@/components/UI/TextView/TextView";

import SuccessAPICreated from "@/assets/icons/SuccessAPICreation.svg";
import CopyYellowIcon from "@/assets/icons/CopyYellow.svg";

import CopyButton from "@/components/UI/CopyButton/CopyButton";

interface ComponentProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  APICreatedKeyDetails: any;
}

const KeyCreatedAPIModal: React.FC<ComponentProps> = ({ isOpen, setIsOpen, APICreatedKeyDetails }) => {
  const [isCheckedCopySecretKey, setIsCheckedCopySecretKey] = useState(false);

  return (
    <CustomModal IsOpen={isOpen} primaryAction={() => setIsOpen(false)} secondaryAction={() => setIsOpen(false)} isPrimaryAction={true} primaryName={"Continue"} isDisabled={!isCheckedCopySecretKey}>
      <Box p={"1rem"}>
        <Box sx={{ marginBottom: "2.25rem" }}>
          <TextView variant={"Bold_28"} text={"API Key Created Successfully"} />
        </Box>
        <Grid container xs={12} sx={{ justifyContent: "space-between" }}>
          <Grid xs={5.5}>
            <BasicTextFields label={"API Name"} disabled disabledTextInPrimary={"true"} backgroundColor={"background.default"} value={APICreatedKeyDetails.apiName} />
          </Grid>
          <Grid xs={5.5} sx={{ justifyContent: "space-between" }}>
            <BasicTextFields label={"API Expiry (days)"} disabled disabledTextInPrimary={"true"} backgroundColor={"background.default"} value={APICreatedKeyDetails.apiExpiry} />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Box>
            <BasicTextFields
              label={"API Key"}
              disabled
              disabledTextInPrimary={"true"}
              backgroundColor={"background.default"}
              value={APICreatedKeyDetails.authToken}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CopyButton copyText={APICreatedKeyDetails.authToken} />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <BasicTextFields
              label={"Secret Key"}
              disabled
              disabledTextInPrimary={"true"}
              backgroundColor={"background.default"}
              value={APICreatedKeyDetails.authSecret}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CopyButton copyText={APICreatedKeyDetails.authSecret} />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
        <Box>
          <TextView text={"Once you close this popup, the Secret Key will not be retrievable."} color={"text.highlight"} variant={"Regular_14"} />
        </Box>
        <Box>
          <TextView text={"Please copy it and store it safely with you. You may have to create a new API if the secret key is lost."} variant={"Regular_14"} />
        </Box>
        <Box />
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  width: "0px",
                  height: " 0px",
                  color: "text.quaternary",
                  "&:hover": {
                    backgroundColor: "transparent"
                  }
                }}
                checked={isCheckedCopySecretKey}
                onChange={(event) => setIsCheckedCopySecretKey(event.target.checked)}
              />
            }
            label="I have copied and stored the secret key"
            sx={{
              mt: 1,
              ml: 0,
              gap: "10px",
              ".MuiTypography-root": {
                fontSize: { xs: "10px", md: "12px" },
                fontWeight: "500",
                letterSpacing: "0.5px",
                color: "text.quaternary"
              }
            }}
          />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default KeyCreatedAPIModal;
