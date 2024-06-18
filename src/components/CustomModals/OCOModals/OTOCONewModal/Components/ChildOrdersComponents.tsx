import React, { useCallback } from "react";
import ChildOrders from "./ChildOrders";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ParentOrder from "./ParentOrder";
interface ActiveModalProps {
  parentOrder: any;
  TPOrder: any;
  SLOrder: any;
}

interface ComponentProps {
  activeModalData: ActiveModalProps;
  close: Function;
}
const ChildOrdersComponents: React.FC<ComponentProps> = ({ activeModalData, close }) => {
  const tradableSymbolList = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const selectedSymbolDetails = tradableSymbolList?.filter((listedSymbol: any) => listedSymbol.symbol.toUpperCase() === activeModalData?.parentOrder?.symbol?.toUpperCase());
  const pricePrecisionValue = selectedSymbolDetails[0]?.pricePrecision;

  const convertToPrecisionValueInPricePrecisionUnit = useCallback(
    (value: any) => {
      return Math.round(parseFloat(value) * Math.pow(10, pricePrecisionValue)) / Math.pow(10, pricePrecisionValue);
    },
    [pricePrecisionValue]
  );

  const getChildren = () => {
    if (activeModalData.TPOrder && activeModalData.SLOrder) {
      return (
        <>
          <ChildOrders type={"TP"} parentData={activeModalData.parentOrder} data={activeModalData.TPOrder} gridSize={5.8} close={close} />
          <ChildOrders type={"SL"} parentData={activeModalData.parentOrder} data={activeModalData.SLOrder} gridSize={5.8} close={close} />
        </>
      );
    } else if (activeModalData.TPOrder) {
      return (
        <ChildOrders
          convertToPrecisionValueInPricePrecisionUnit={convertToPrecisionValueInPricePrecisionUnit}
          // submitUpdatePrice={submitUpdatePrice}
          type={"TP"}
          gridSize={12}
          parentData={activeModalData.parentOrder}
          data={activeModalData.TPOrder}
          close={close}
        />
      );
    } else if (activeModalData.SLOrder) {
      return (
        <ChildOrders
          convertToPrecisionValueInPricePrecisionUnit={convertToPrecisionValueInPricePrecisionUnit}
          // submitUpdatePrice={submitUpdatePrice}
          type={"SL"}
          gridSize={12}
          parentData={activeModalData.parentOrder}
          data={activeModalData.SLOrder}
          close={close}
        />
      );
    }
  };
  return (
    <>
      <Typography variant={"Medium_16"}>
        {"One Triggers One Cancels Other - "}
        <Typography component={"span"} color={"text.secondary"}>
          {"Open Orders"}
        </Typography>
      </Typography>
      <Grid container item xs={12} justifyContent={"center"} gap={2}>
        <ParentOrder order={activeModalData?.parentOrder} convertToPrecisionValueInPricePrecisionUnit={convertToPrecisionValueInPricePrecisionUnit} />
        {getChildren()}
      </Grid>
      <Typography component={"div"} color={"#EBB62F"} variant={"Regular_12"} mt={0.5}>
        {"Please take into consideration liquidation price while placing SL"}
      </Typography>
      <Typography component={"div"} color={"text.main"} variant="Regular_12" mt={2}>
        {"Note  "}
        <Typography color={"text.secondary"} variant="Regular_12" component={"span"}>
          {"TP/SL Orders will become active once the parent order is executed."}
        </Typography>
      </Typography>
    </>
  );
};

export default ChildOrdersComponents;
