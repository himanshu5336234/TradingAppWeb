import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";

import React, { memo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import { ACCODIAN, ACCORDIANHEADER, ACCORDIANGRIDITEM, ACCORDIANGRIDITEMHEADING, BORDER, EXPANDICON, FONT12, SECTIONHEIGHT } from "@/pages/MobileView/style";
import { useTradeHistory } from "BL/businessHooks";
import CustomDateRangeFilter from "../CustomDateRangeFilter";
import { FEE, PRICE, QUANTITY, REALIZEDPROFIT } from "@/pages/MobileView/mMagicString";
import PropTypes from "prop-types";
const mTradeHistory = (props) => {
  const [showSelectDateRange, setSelectDateRange] = useState(false);
  const { tradeHistoryData } = useTradeHistory();
  const showOrderHistoryData = () => {
    if (tradeHistoryData?.length > 0) {
      return tradeHistoryData.map((item, index) => {
        return (
          <>
            <Grid item key={index} xs={12}>
              <Accordion sx={ACCODIAN}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={EXPANDICON} />}>
                  <Box sx={ACCORDIANHEADER}>
                    <Box sx={ACCORDIANGRIDITEM}>
                      <Typography
                        variant="Medium_12"
                        component={"p"}
                        sx={{
                          px: 1.7,
                          py: 0.4,
                          mb: 1,
                          borderRadius: "2px",
                          backgroundColor: item.side === "LONG" ? "text.success" : "text.error",
                          textAlign: "center",
                          height: "fit-content"
                        }}
                      >
                        {item.side}
                      </Typography>
                      <Typography variant={"Bold_16_21"} component={"h6"}>
                        {item.symbol} |{" "}
                        <span>
                          {" "}
                          {new Date(item.time).getDay()} {new Date(item.time).toLocaleString("default", { month: "long" }).slice(0, 3)}
                        </span>
                        <span> {new Date(item.time).getHours() + ":" + new Date(item.time).getMinutes()}</span>
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={BORDER}>
                  <Grid container spacing={2}>
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {PRICE}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {QUANTITY}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {item.qty}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {FEE}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {Number(item.commission).toFixed(4)}
                      </Typography>
                    </Grid>{" "}
                    <Grid item xs={3} sx={ACCORDIANGRIDITEM}>
                      <Typography varient="h6" sx={ACCORDIANGRIDITEMHEADING}>
                        {REALIZEDPROFIT}
                      </Typography>
                      <Typography varient="h5" sx={FONT12}>
                        {Number(item.realizedPnl).toFixed(4)}
                      </Typography>
                    </Grid>{" "}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </>
        );
      });
    } else {
      <Typography variant="h5" sx={{ fontSize: "Regular_14" }}>
        {" "}
        No Trade History
      </Typography>;
    }
  };

  return (
    <>
      {showSelectDateRange && <CustomDateRangeFilter setSelectDateRange={setSelectDateRange} />}
      <Box sx={{ width: "100%", overflow: "auto" }}>
        {" "}
        <FormControl sx={{ width: "400px", padding: "6px " }}>
          <RadioGroup
            sx={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "nowrap"
            }}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="1"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="1"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18
                    }
                  }}
                />
              }
              label="1Day"
            />
            <FormControlLabel
              value="7"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18
                    }
                  }}
                />
              }
              label="1Week"
            />
            <FormControlLabel
              value="30"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18
                    }
                  }}
                />
              }
              label="1Month"
            />
            <FormControlLabel
              value="90"
              control={
                <Radio
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18
                    }
                  }}
                />
              }
              label="3Month"
            />
            <FormControlLabel
              value="0"
              control={
                <Radio
                  onChange={() => setSelectDateRange(!showSelectDateRange)}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18
                    }
                  }}
                />
              }
              label="Custom"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={SECTIONHEIGHT}>
        <Grid container gap="10px">
          {showOrderHistoryData()}
        </Grid>
      </Box>
    </>
  );
};
mTradeHistory.propTypes = {
  index: PropTypes.number
};
export default memo(mTradeHistory);
