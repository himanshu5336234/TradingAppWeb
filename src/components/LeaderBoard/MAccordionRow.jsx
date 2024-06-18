import { Accordion, AccordionDetails, AccordionSummary, Typography, Box } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { numberWithCommas } from "@/helpers/commaHelper";

const MAccordionRow = ({ row }) => {
  return (
    <Accordion sx={{ width: "100%", backgroundColor: "#25252B" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#25252B", ".Mui-expanded": { marginY: 0 } }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "45%", display: "flex", gap: "13px" }}>
            <Typography variant="SemiBold_12" color={"text.main"}>
              {row.rank <= 9 && 0}
              {row.rank}
            </Typography>
            <Typography variant="Regular_12">{row.nickname}</Typography>
          </Box>
          <Box sx={{ width: "55%", textAlign: "center" }}>
            <Typography variant="Regular_12">{numberWithCommas(row.volume)}</Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#25252B" }}>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "45%" }}>
            <Typography component={"span"} variant="light_12">
              Win Rate:{" "}
            </Typography>
            <Typography component={"span"} variant="SemiBold_12">
              {row.winRate}
            </Typography>
          </Box>
          <Box sx={{ width: "55%" }}>
            <Typography component={"span"} variant="light_12">
              Favourite Pair:{" "}
            </Typography>
            <Typography component={"span"} variant="SemiBold_12">
              {row.favouritePair}
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default MAccordionRow;

MAccordionRow.propTypes = {
  row: PropTypes.object
};
