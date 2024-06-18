import React from "react";
import { Grid, Box } from "@mui/material";
import { INDIVIDUAL_TABLE_HEADERS } from "./TableHeaders";
import TableCell from "@/components/SignalTrading/TableHeaderCell";
import TPSLRow from "./TPSLRow";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
interface Order {
  symbol: string;
  quantity: number;
  side: string;
  stopPrice: string;
  type: string;
}
interface IndividualOrdersProps {
  orders: Order[];
  cancelOrder: Function;
}
const IndividualOrders: React.FC<IndividualOrdersProps> = ({ orders, cancelOrder }) => {
  return (
    <Box
      height={"230px"}
      sx={{
        overflow: "hidden",
        overflowY: "scroll"
      }}
    >
      <Grid container mt={3} mb={2}>
        {INDIVIDUAL_TABLE_HEADERS.map((heading) => (
          <TableCell heading={heading} />
        ))}
      </Grid>
      {orders.length === 0 && <TableNoRowsOverlay message={"No Individual Orders Data Availale"} />}
      {orders.map((order: Order, ind: number) => (
        <TPSLRow key={ind} order={order} cancelOrder={cancelOrder} />
      ))}
    </Box>
  );
};

export default IndividualOrders;
