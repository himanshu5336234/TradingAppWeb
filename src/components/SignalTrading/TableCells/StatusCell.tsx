import React from "react";
import { Grid } from "@mui/material";
import StatusTab from "../StatusTab";
import ShareIcon from "../../../assets/images/ShareIcon.svg";

interface StatusCellProps {
  status: string;
  gridSize: number;
}
const StatusCell: React.FC<StatusCellProps> = ({ status, gridSize }) => {
  const getType = () => {
    switch (status) {
      case "COMPLETED":
      case "TRIGGERED":
        return "SUCCESS";
      case "DELETED":
      case "LIVE":
        return "ERROR";
      case "PUBLISHED":
        return "PENDING";
      default:
        return "";
    }
  };
  return (
    <Grid item container alignItems={"center"} xs={gridSize} gap={1}>
      <StatusTab type={getType()} text={status} />
      {status === "COMPLETED" || (status === "REJECTED" && <img src={ShareIcon} width={"24px"} />)}
    </Grid>
  );
};

export default StatusCell;
