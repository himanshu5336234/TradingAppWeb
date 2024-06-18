import { InputAdornment } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo } from "react";
import BasicTextFields from "../../UI/CustomInput/BasicTextFields";
import SearchIcon from "@mui/icons-material/Search";
const SideMenuSearch = ({ SETSEARCHSYMBOL, handleSort }) => {
  return (
    <BasicTextFields
      styles={{
        ".MuiInputBase-input": {
          p: 1,
          fontFamily: "Neurial-Regular",
          fontSize: "14px"
        }
      }}
      onChange={(event) => SETSEARCHSYMBOL(event.target.value)}
      placeholder="Search Contract"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" disableTypography>
            <SearchIcon id="search-symbol-icon" sx={{ cursor: "pointer" }} onClick={() => handleSort("symbol")} />
          </InputAdornment>
        )
      }}
      autoFocus={true}
    />
  );
};
SideMenuSearch.propTypes = {
  SearchSymbol: PropTypes.string,
  SETSEARCHSYMBOL: PropTypes.func,
  handleSort: PropTypes.func
};
export default memo(SideMenuSearch);
