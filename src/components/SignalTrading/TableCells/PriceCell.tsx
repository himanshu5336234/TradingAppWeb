import React from "react";
import { Grid, Typography } from "@mui/material";
import EditIcon from "../../../assets/images/EditSquare.svg";

interface PriceCellProps {
  gridSize: number;
  price: string;
  showEdit?: boolean; // Make showEdit prop optional
  onClick?: () => void;
  status: string; // Define a function type for onClick
}

const PriceCell: React.FC<PriceCellProps> = ({ gridSize, price, showEdit = true, onClick, status }) => {
  return (
    <Grid item container xs={gridSize} alignItems={"center"} gap={2}>
      <Typography variant="Regular_14">{price || "--"}</Typography>
      {showEdit && status?.includes("NEW") && price && <img src={EditIcon} alt="Edit Icon" onClick={onClick} style={{ cursor: "pointer" }} />}
    </Grid>
  );
};

export default PriceCell;
