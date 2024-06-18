import React from "react";
import { Box } from "@mui/material";
import Both from "@/assets/images/orderBook/Both.svg";
import Asks from "@/assets/images/orderBook/Asks.svg";
import Bids from "@/assets/images/orderBook/Bids.svg";

const AskOrbids = ({ asksOrBids, handleTabsChange }: { asksOrBids: string; handleTabsChange: Function }) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "20px",
        justifyContent: "space-between",
        m: 1
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box onClick={() => handleTabsChange("ALL")} sx={{ height: "10px", cursor: "pointer", filter: `${asksOrBids !== "ALL" ? "opacity(0.4)" : ""}` }} component={"img"} src={Both} alt="All" />

        <Box onClick={() => handleTabsChange("ASKS")} sx={{ height: "10px", cursor: "pointer", filter: `${asksOrBids !== "ASKS" ? "opacity(0.4)" : ""}` }} component={"img"} src={Asks} alt="Asks" />

        <Box onClick={() => handleTabsChange("BIDS")} sx={{ height: "10px", cursor: "pointer", filter: `${asksOrBids !== "BIDS" ? "opacity(0.4)" : ""}` }} component={"img"} src={Bids} alt="Bids" />
      </Box>
      <Box>
        {" "}
        {/* <Select
          onChangeHandler={(event) =>
            dispatchOrderBookEvent({
              type: "UPDATE_TICKET_SIZE",
              payload: event.target.value
            })
          }
          value={state.ticket}
          values={state.GroupArray}
        /> */}
      </Box>
    </Box>
  );
};

export default React.memo(AskOrbids);
