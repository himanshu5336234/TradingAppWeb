import { Box, Button, Drawer, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { TABS_CONSTANTS } from "@/frontend-BL/businessHooks/WALLET/Constants/Tabs.const";
import CalenderModal from "@/components/CustomModals/newModal/CalenderModal";
import PropTypes from "prop-types";

const WalletFilter = ({ openFilterMenu, setOpenFilterMenu, transactionFilter, setTransactionFitler, duration, setDuration, selectCustomDateRange, transactionFilterConstants }) => {
  const [activeFilterType, setActiveFilterType] = useState("transactionType");
  const [showCustomDurationModal, setShowCustomDurationModal] = useState(false);
  const [activeDurationFilter, setActiveDurationFilter] = useState(duration);
  const [activeTransactionType, setActiveTransactionType] = useState(transactionFilter);
  const handleClearClick = () => {
    setActiveDurationFilter("all");
    setActiveTransactionType("ALL");
  };

  const prevDuration = activeDurationFilter;

  const handleDurationFilterChange = (event) => {
    if (event.target.value === "custom") {
      setActiveDurationFilter(prevDuration);
      handleCustomDateSelect();
      return;
    }
    setActiveDurationFilter(event.target.value);
  };

  const handleCustomDateSelect = () => {
    setShowCustomDurationModal(true);
  };

  const handleCancelFilter = () => {
    setActiveDurationFilter(duration);
    setActiveTransactionType(transactionFilter);
    setOpenFilterMenu(false);
  };

  const handleSubmitFilter = () => {
    setDuration(activeDurationFilter);
    setTransactionFitler("", activeTransactionType);
    setOpenFilterMenu(false);
  };
  return (
    <Drawer
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "100%",
          height: "100vh",
          backgroundColor: "background.default",
          overflowY: "hidden"
        }
      }}
      variant="persistent"
      anchor="left"
      open={openFilterMenu}
    >
      <Box sx={{ height: 64, display: "flex", alignItems: "center", borderBottom: "0.5px solid #616060" }}>
        <Box>
          <IconButton onClick={handleCancelFilter}>
            <ChevronLeftIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "90%", alignItems: "center", mr: 2 }}>
          <Typography variant="Regular_20" component={"p"}>
            Filters
          </Typography>
          <Typography variant="Regular_16" component={"p"} color="text.main" onClick={handleClearClick}>
            CLEAR ALL
          </Typography>
        </Box>
      </Box>
      <Grid container sx={{ height: "calc(100% - 64px)" }}>
        <Grid item container xs={12} sx={{ height: "90%" }}>
          <Grid item xs={4.5} sx={{ borderRight: "0.5px solid #616060", padding: 0 }}>
            <Box sx={{ borderBottom: "0.5px solid #616060", width: "100%", px: 0.7, py: 2 }}>
              <Typography variant="SemiBold_14" color={activeFilterType === "transactionType" ? "text.main" : "white"} onClick={() => setActiveFilterType("transactionType")}>
                Transaction Type
              </Typography>
            </Box>
            <Box sx={{ borderBottom: "0.5px solid #616060", width: "100%", px: 1, py: 2 }}>
              <Typography variant="SemiBold_14" color={activeFilterType === "durationType" ? "text.main" : "white"} onClick={() => setActiveFilterType("durationType")}>
                Date Range
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7.5} px={1}>
            {activeFilterType === "transactionType" && (
              <RadioGroup defaultValue="all" name="radio-buttons-group-inr" value={activeTransactionType} onChange={(event) => setActiveTransactionType(event.target.value)} sx={{ my: 1 }}>
                {transactionFilterConstants.map((obj) => {
                  return (
                    <FormControlLabel
                      sx={{ borderBottom: "0.5px solid #616060", mx: 1, pb: 0.5, ".MuiFormControlLabel-label": { fontSize: "14px" } }}
                      key={obj.val}
                      value={obj.val}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "white"
                          }}
                        />
                      }
                      label={obj.name}
                    />
                  );
                })}
              </RadioGroup>
            )}
            {activeFilterType === "durationType" && (
              <RadioGroup defaultValue="all" name="radio-buttons-group-inr" value={activeDurationFilter} onChange={(event) => handleDurationFilterChange(event)} sx={{ my: 1 }}>
                {TABS_CONSTANTS.TABLE_DURATION_FILTER_VALUE.map((obj) => {
                  return (
                    <FormControlLabel
                      sx={{ borderBottom: "0.5px solid #616060", mx: 1, pb: 0.5, ".MuiFormControlLabel-label": { fontSize: "14px" } }}
                      key={obj.value}
                      value={obj.value}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "white"
                          }}
                        />
                      }
                      label={obj.name}
                    />
                  );
                })}
              </RadioGroup>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: "10%" }}>
          <Box sx={{ width: "100%", position: "relative", display: "flex", py: 2, px: 3, gap: 2, justifyContent: "space-between", borderTop: "1px dotted #595959" }}>
            <Button variant="main" sx={{ width: "48%" }} onClick={handleCancelFilter}>
              {" "}
              Cancel{" "}
            </Button>
            <Button variant="primary" sx={{ width: "48%" }} onClick={handleSubmitFilter}>
              {" "}
              Apply{" "}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CalenderModal setSelectDateRange={selectCustomDateRange} showCalender={showCustomDurationModal} setShowCalender={setShowCustomDurationModal} />
    </Drawer>
  );
};

export default WalletFilter;

WalletFilter.propTypes = {
  openFilterMenu: PropTypes.bool,
  setOpenFilterMenu: PropTypes.func,
  transactionFilter: PropTypes.string,
  setTransactionFitler: PropTypes.func,
  duration: PropTypes.string,
  setDuration: PropTypes.func,
  selectCustomDateRange: PropTypes.func,
  transactionFilterConstants: PropTypes.array
};
