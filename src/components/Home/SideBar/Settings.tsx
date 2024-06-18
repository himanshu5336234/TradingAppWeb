import React, { useCallback, useEffect, useRef, useState } from "react";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Box, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import { useDispatch, useSelector } from "react-redux";
import { Layouts, Components as defaultComp, removeChartData, addChartData } from "@/assets/Theme/layoutConfig";
import CustomDivider from "@/components/UI/Divider/CustomDivider";
const Settings = () => {
  const [open, setopen] = useState(false);
  const { Layout, Components } = useSelector((state: any) => state.Layout);
  const modalEl = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: (window as any).JSON.parse(localStorage.getItem("layout")) ?? Layouts } });
    dispatch({ type: "CHANGE_COMPONENT", payload: (window as any).JSON.parse(localStorage.getItem("Components")) ?? defaultComp });
    const handler = (event: { target: any }) => {
      if (!modalEl.current) {
        return;
      }

      if (!modalEl.current.contains(event.target)) {
        setopen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);
  const ResetLayout = () => {
    dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: Layouts } });
    dispatch({ type: "CHANGE_COMPONENT", payload: defaultComp });
  };

  const ResetComponentInLayout = (payload: string, checked: boolean) => {
    if (checked) {
      const newLayout = addChartData({ currentLayout: Layout, compName: payload, DefaultLayout: Layouts });
      dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: newLayout } });
      dispatch({ type: "CHANGE_COMPONENT", payload: [...new Set([...Components, payload])] });
    } else {
      const compomentName = Components.filter((item: string) => item !== payload);
      const modifiedLayouts = removeChartData(Layout, payload);
      dispatch({ type: "CHANGE_COMPONENT", payload: compomentName });

      dispatch({ type: "CHANGE_LAYOUT", payload: { Layout: modifiedLayouts } });
    }
  };

  const show = useCallback(() => {
    return (
      <Box
        ref={modalEl}
        sx={{
          p: 1,
          zIndex: 300,
          top: "-230px",
          left: "43px",
          borderRadius: "4px",
          border: "0.5px solid",
          borderColor: "text.tertiary",
          boxShadow: " 6px 8px 8px 0px #0000008F",
          minWidth: "250px",
          backgroundColor: "background.primary",
          position: "absolute"
        }}
      >
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <TextView variant={"Bold_16"} text={"Style"} />
            <Box
              onClick={() => setopen(false)}
              sx={{
                position: "absolute",
                right: "5px",
                top: "5px",
                width: "20px",
                height: "20px",
                cursor: "pointer"
              }}
            >
              <Typography sx={{ m: " auto" }}>&#x2715;</Typography>
            </Box>
          </Grid>
          <CustomDivider alignment={""} />
          <Grid item xs={12}>
            <FormControlLabel
              sx={{
                gap: 2,
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  color: "text.quaternary",
                  fontSize: "12px"
                }
              }}
              control={<Switch checked={Components.includes("chart")} onChange={(event) => ResetComponentInLayout("chart", event.target.checked)} />}
              label="Chart"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{
                gap: 2,
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                  color: "text.quaternary"
                }
              }}
              control={<Switch checked={Components.includes("orderBook")} onChange={(event) => ResetComponentInLayout("orderBook", event.target.checked)} />}
              label="Order Book"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{
                gap: 2,
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                  color: "text.quaternary"
                }
              }}
              control={<Switch checked={Components.includes("orderForm")} onChange={(event) => ResetComponentInLayout("orderForm", event.target.checked)} />}
              label="Place Order"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{
                gap: 2,
                ml: 0,
                "& .MuiFormControlLabel-label": {
                  fontSize: "12px",
                  color: "text.quaternary"
                }
              }}
              control={<Switch checked={Components.includes("userActivities")} onChange={(event) => ResetComponentInLayout("userActivities", event.target.checked)} />}
              label="Position & open order"
            />
          </Grid>
          <CustomDivider alignment={""} />
          <Grid item xs={12}>
            <TextView onClick={ResetLayout} style={{ cursor: "pointer" }} variant={"Regular_12"} color={"text.main"} text={"Back to Default Layout"} />
          </Grid>
        </Grid>
      </Box>
    );
  }, [open, Components]);

  return (
    <Box position={"relative"}>
      <SettingsSuggestIcon onClick={() => setopen(!open)} sx={{ width: 20, cursor: "pointer", color: !open ? "#8B8B97" : "text.default" }} />
      {open && <>{show()}</>}
    </Box>
  );
};

export default Settings;
