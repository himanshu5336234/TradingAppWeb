import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedSymbol } from "@/frontend-BL/redux/actions/Internal/SetSelectedSymbol.ac";
const CardRow = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "neutral.grey2"
        },
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1
      }}
      onClick={() => {
        dispatch(selectedSymbol(data.Symbol?.toUpperCase()));
        navigate("/");
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1
          }}
        >
          <Box
            component={"img"}
            onError={(event) => (event.target.style.display = "none")}
            src={getCurrencyUrl(data.Symbol.replace("USDT", "").toLowerCase())}
            alt="symbolLogo"
            sx={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: "white"
            }}
          />

          <Typography variant={"bold_14"} color={"neutral.black"} component={"p"}>
            {data.Symbol?.toUpperCase()}
          </Typography>
        </Box>
        <Typography
          variant="labelLarge"
          component={"p"}
          textAlign={"end"}
          sx={{
            color: parseFloat(data?.change) >= 0 ? "text.success" : "text.error",
            backgroundColor: "#0000004D",
            px: 1,
            py: "2px",
            borderRadius: 1
          }}
        >
          {parseFloat(data?.change) >= 0 ? "+" : ""}
          {data?.change}
          {"%"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="labelSmall" component={"p"} textAlign={"start"} color="neutral.grey7">
          {"Volume (USDT)"}
        </Typography>
        <Typography variant="labelSmall" component={"p"} textAlign={"end"} color="neutral.grey7">
          {data?.value}
        </Typography>
      </Box>
    </Box>
  );
};

export default React.memo(CardRow);

CardRow.propTypes = {
  data: PropTypes.object
};
