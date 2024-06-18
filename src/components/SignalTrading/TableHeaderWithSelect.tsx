import React from "react";
import { Grid } from "@mui/material";
import CustomSelect from "../UI/Select/Select";

interface TableHeaderWithSelectProps {
  heading: {
    id: string;
    gridSize: number;
    name: string;
    isSelect: boolean;
    options: object[];
  };
  value: any;
  label: string;
}

const TableHeaderWithSelect: React.FC<TableHeaderWithSelectProps> = ({ heading, value, onChange, options, label }) => {
  return (
    <Grid item xs={heading.gridSize}>
      <CustomSelect label={label} value={value} setValue={onChange} values={options} selectStyle={{ fontSize: "14px", height: "32px" }} menuStyle={{ fontSize: "14px" }} />
    </Grid>
  );
};

export default TableHeaderWithSelect;
