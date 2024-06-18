import { Grid } from "@mui/material";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import React, { useState } from "react";
import { getTradeIdData } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import TradeIDModal from "@/components/NewWallet/TradeIDModal";
import TextView from "../UI/TextView/TextView";

const TradeIDcell = ({ tradeID, gridSize }: { tradeID: string; gridSize: number }) => {
  const [openTradeIDModal, setOpenTradeIDModal] = useState(false);
  const [tradeIDModalData, setTradeIDModalData] = useState([]);

  const handleTradeIDClick = () => {
    getTradeIdData(tradeID).then((result: []) => {
      setTradeIDModalData(result);
      setOpenTradeIDModal(true);
    });
  };
  return (
    <>
      <Grid item container xs={gridSize} alignItems={"center"}>
        {tradeID ? (
          <>
            <TextView
              variant={"Bold_14"}
              onClick={handleTradeIDClick}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                textDecorationThickness: "3px",
                textUnderlineOffset: "4px"
              }}
              text={tradeID}
            ></TextView>
            <CopyButton copyText={tradeID} />
          </>
        ) : (
          <TextView variant={"Bold_14"} text={"--"}></TextView>
        )}
      </Grid>
      <TradeIDModal tradeIDModalData={tradeIDModalData} close={() => setOpenTradeIDModal(false)} openTradeIDModal={openTradeIDModal} />
    </>
  );
};

export default TradeIDcell;
