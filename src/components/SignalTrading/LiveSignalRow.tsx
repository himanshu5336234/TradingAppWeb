import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TPSLCell from "./TableCells/TPSLCell";
import SymbolCell from "./TableCells/SymbolCell";
import DateCell from "./TableCells/DateCell";
import SideCell from "./TableCells/SideCell";
import PriceCell from "./TableCells/PriceCell";
import StatusCell from "./TableCells/StatusCell";
import ActionsCell from "./TableCells/ActionsCell";
import UpdateTriggerPriceModal from "./Modals/EditTriggerPriceModal";
import UpdateLimitPriceModal from "./Modals/EditLimitPriceModal";

import { editASignal } from "@/frontend-api-service/Api/SignalTrading/SignalTrading";
import { useDispatch } from "react-redux";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

const LiveSignalRow = ({ data, dispatchLatestListOfSignalsForAnalyst }) => {
  const [showEditTriggerPriceModal, setShowEditTriggerPriceModal] = useState(false);
  const [showEditLimitPriceModal, setShowEditLimitPriceModal] = useState(false);
  const [limitPrice, setLimitPrice] = useState<number>();
  const [triggerPrice, setTriggerPrice] = useState<number>();
  useEffect(() => {
    setLimitPrice(data.orderPrice);
    setTriggerPrice(data.orderStopPrice);
  }, [data]);

  const [signalId, setSignalId] = useState("");

  const [symbol, setSymbol] = useState("");
  const dispatch = useDispatch();
  const handleLimitPriceChange = (signalId: string, limitPrice: number) => {
    editASignal({
      signalId,
      orderPrice: Number(limitPrice)
    })
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        setShowEditLimitPriceModal(false);
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "UPDATE_LIMIT_PRICE_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setShowEditLimitPriceModal(false);
      });
  };

  const handleTriggerPriceChange = (signalId: string, triggerPrice: number) => {
    editASignal({
      signalId,
      orderStopPrice: Number(triggerPrice)
    })
      .then(() => {
        dispatchLatestListOfSignalsForAnalyst();
        setShowEditTriggerPriceModal(false);
      })
      .catch((err: any) => {
        dispatch(
          showSnackBar({
            src: "UPDATE_TRIGGER_PRICE_FAILED",
            message: err.response.data.details,
            type: "failure"
          })
        );
        setShowEditTriggerPriceModal(false);
      });
  };

  return (
    <>
      <Grid container key={data.signalId} mb={2}>
        <DateCell value={data.createdAt} gridSize={1.4} />
        <SymbolCell symbol={data.symbol?.toUpperCase()} gridSize={1.9} leverage={data.leverage} marginMode={data.marginMode.includes("ISOLATED") ? "Isolated" : "Cross"} />
        <SideCell side={data.orderSide} gridSize={1} />
        <PriceCell
          status={data.status}
          price={data.orderStopPrice}
          gridSize={1.3}
          onClick={() => {
            setShowEditTriggerPriceModal(true);
            setSymbol(data.symbol);
            setSignalId(data.signalId);
          }}
        />
        <PriceCell
          status={data.status}
          price={data.orderPrice}
          gridSize={1.3}
          onClick={() => {
            setShowEditLimitPriceModal(true);
            setSymbol(data.symbol);
            setSignalId(data.signalId);
          }}
        />
        <TPSLCell
          takeProfit={data.takeProfitStopPrice}
          stopLoss={data.stopLossStopPrice}
          gridSize={1.3}
          status={data.status}
          signalData={data}
          dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
        />
        <StatusCell status={data.status} gridSize={1.5} />
        <ActionsCell
          signalId={data.signalId}
          dispatchLatestListOfSignalsForAnalyst={dispatchLatestListOfSignalsForAnalyst}
          status={data.status}
          gridSize={2.3}
          side={data.orderSide}
          triggerPrice={data.orderStopPrice}
          type={data.orderType}
          limitPrice={data.orderPrice}
          symbol={data.symbol}
        />
        {/* <TableDataCell value={data.act} gridSize={1.8} /> */}
      </Grid>
      {showEditTriggerPriceModal && (
        <UpdateTriggerPriceModal
          primaryAction={() => handleTriggerPriceChange(signalId, triggerPrice)}
          symbol={symbol}
          triggerPrice={triggerPrice}
          setTriggerPrice={setTriggerPrice}
          IsOpen={showEditTriggerPriceModal}
          setShowTriggerModal={setShowEditTriggerPriceModal}
          currentLimitPrice={data.orderPrice}
          currentTriggerPrice={data.orderStopPrice}
          side={data.orderSide}
          type={data.orderType}
        />
      )}
      {showEditLimitPriceModal && (
        <UpdateLimitPriceModal
          primaryAction={() => handleLimitPriceChange(signalId, limitPrice)}
          symbol={symbol}
          currentLimitPrice={data.orderPrice}
          currentTriggerPrice={data.orderStopPrice}
          limitPrice={limitPrice}
          setLimitPrice={setLimitPrice}
          IsOpen={showEditLimitPriceModal}
          setShowLimitModal={setShowEditLimitPriceModal}
          side={data.orderSide}
          type={data.orderType}
          slPrice={data.stopLossStopPrice}
          tpPrice={data.takeProfitStopPrice}
        />
      )}
    </>
  );
};

export default LiveSignalRow;
