import TextView from "@/components/UI/TextView/TextView";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CloseAllPosition } from "./CloseAllPosition";
import { TotalProfitAndLoss } from "./TotalProfitAndLoss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_PROFIT_LOSS_BASED_ON } from "@/frontend-BL/redux/constants/Constants";
const TotalProfitAndLossWrapper = () => {
  const [showDropDown, SetShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const TotalUnRealisedProfitAndLossBasedOn = useSelector((state: any) => state.TotalProfitLossBasedOn);
  const modalEl = useRef();
  useEffect(() => {
    const handler = (event: { target: any }) => {
      if (!modalEl.current) {
        return;
      }

      if (!modalEl.current.contains(event.target)) {
        SetShowDropdown(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const show = useCallback(() => {
    return (
      <Box
        ref={modalEl}
        sx={{
          borderRadius: "4px",
          p: 1,
          zIndex: 1300,
          top: "-100px",
          minWidth: "170px",
          backgroundColor: "background.tertiary",
          position: "absolute"
        }}
      >
        <TextView variant={"Medium_10"} color={"text.quaternary"} text={"CALCULATED AT"} />
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px"
            }
          }}
          control={
            <Checkbox
              id="don't-show-me-checkbox"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "&.Mui-checked": {
                  color: "text.main"
                }
              }}
              onClick={() =>
                dispatch({
                  type: SET_SHOW_PROFIT_LOSS_BASED_ON,
                  payload: "LTP"
                })
              }
              checked={TotalUnRealisedProfitAndLossBasedOn.TotalProfitLossBasedOn === "LTP"}
            />
          }
          label="Last Price"
        />
        <FormControlLabel
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "12px"
            }
          }}
          control={
            <Checkbox
              id="don't-show-me-checkbox"
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
                "&.Mui-checked": {
                  color: "text.main"
                }
              }}
              onClick={() =>
                dispatch({
                  type: SET_SHOW_PROFIT_LOSS_BASED_ON,
                  payload: "MARK_PRICE"
                })
              }
              checked={TotalUnRealisedProfitAndLossBasedOn.TotalProfitLossBasedOn !== "LTP"}
            />
          }
          label="Mark Price"
        />
      </Box>
    );
  }, [showDropDown, TotalUnRealisedProfitAndLossBasedOn]);

  return (
    <Grid container justifyContent={"space-between"} height={"100%"}>
      <Grid xs={8}>
        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextView variant="Medium_11" color={"text.quaternary"} component={"p"} text={"TOTAL P&L (USDT)"} />
            <ExpandMoreIcon
              onClick={() => SetShowDropdown(!showDropDown)}
              sx={{
                color: "text.main",
                cursor: "pointer",
                width: { sm: 20, xs: 20 },
                height: { sm: 20, xs: 20 }
              }}
            />
          </Box>

          {showDropDown && <>{show()}</>}
        </Box>

        <TotalProfitAndLoss variant="Bold_16" />
      </Grid>
      <Grid className="productTour__step8" xs={3.5}>
        <CloseAllPosition />
      </Grid>
    </Grid>
  );
};

export default TotalProfitAndLossWrapper;
