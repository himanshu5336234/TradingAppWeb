import React, { useContext } from "react";
import OrderFormContext from "../OrderFormNewWrapper";
import LeverageContainerForSignalTrading from "./LeverageContainerForSignalTrading";
import LeverageContanier from "./LeverageContanier";

const index = () => {
  const { state } = useContext(OrderFormContext);
  return state.isSignalTrading ? <LeverageContainerForSignalTrading /> : <LeverageContanier />;
};

export default index;
