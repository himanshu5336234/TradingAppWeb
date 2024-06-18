import React from "react";
import { Grid, Slider, Typography } from "@mui/material";
import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
function createNumberArray(num: number) {
  const arr = [{ name: "1x", value: 1 }];

  for (let i = 1; i <= num; i++) {
    if (i % (num / 5) === 0 || i % (num / 3) === 0) {
      arr.push({ name: `${i}x`, value: i });
    }
  }

  return arr;
}

const LeverageSlider = ({ handleLeverageChange, leverage, maxLeverage }: { handleLeverageChange: () => void; leverage: number; maxLeverage: number }) => {
  return (
    <Grid item xs={12} container gap={2} id="leverageContainer" justifyContent={"space-between"} alignItems={"center"}>
      <Grid item xs={8.2} sx={{ width: 100, display: "flex", gap: "6px" }}>
        <Slider
          id={"orderForm-leverageSlider-at-" + leverage}
          min={1}
          sx={{
            color: "#C0DF5A",
            height: "6px",
            borderRadius: "40px",
            "& .MuiSlider-thumb": {
              width: 21,
              height: 21,
              background: "linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),conic-gradient(from 135deg at 50% 50%, #16B943 0deg, #EBFF25 193.12deg, #16B943 360deg)",
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)"
              }
            },
            "& .MuiSlider-rail": {
              backgroundColor: "background.tertiary"
            }
          }}
          max={maxLeverage}
          size="small"
          valueLabelDisplay="auto"
          value={leverage}
          onChange={handleLeverageChange}
        />
      </Grid>

      <Grid id="leverage-Grid" item xs={3}>
        <Typography
          id="orderForm-currentLeverage"
          variant={"Bold_14"}
          component={"p"}
          textAlign={"center"}
          sx={{
            backgroundColor: "background.default",
            p: 0.7,
            border: "1px solid",
            borderColor: "text.tertiary",
            borderRadius: "4px",
            width: "100%"
          }}
        >
          {leverage}
          {"x"}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <ToggleGroup
          value={leverage}
          handleChange={(event, value) => {
            handleLeverageChange({
              target: { value: event.target.value }
            });
          }}
          variant={"primary"}
          values={createNumberArray(maxLeverage)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(LeverageSlider);
