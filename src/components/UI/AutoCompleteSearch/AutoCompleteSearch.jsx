/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
const countries = [
  { symbol: "AD", label: "Andorra", phone: "376" },
  {
    symbol: "AE",
    label: "United Arab Emirates",
    phone: "971"
  },
  { symbol: "AF", label: "Afghanistan", phone: "93" }
];

export default function AutocompleteSearch({ options, onchange }) {
  const [CURRENTVALUE, setCUTTENTVALUE] = React.useState("");
  const countrie = options;
  return (
    <>
      <Autocomplete
        onChange={(event, value) => onchange(value.symbol)}
        sx={{ width: 300 }}
        id="size-small-standard"
        size="small"
        options={countrie}
        getOptionLabel={(option) => option.symbol}
        defaultValue={countrie[10]}
        renderOption={(props, option) => (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
            {/* <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${option.symbol.toLowerCase()}.png`} srcSet={`https://flagcdn.com/w40/${option.symbol.toLowerCase()}.png 2x`} alt="" /> */}
            {option.symbol}
          </Box>
        )}
        renderInput={(params) => (
          <Box sx={{ display: "flex", alignItems: "center", border: "1px solid", p: 1 }}>
            <TextField
              sx={{
                "& fieldset": { border: "none" }
              }}
              {...params}
              placeholder={"select symbol"}
            />
            <SearchIcon sx={{ ml: 2, width: "20px" }} />
          </Box>
        )}
      />
    </>
  );
}
AutocompleteSearch.propTypes = {
  options: PropTypes.array,
  onchange: PropTypes.func
};
// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
