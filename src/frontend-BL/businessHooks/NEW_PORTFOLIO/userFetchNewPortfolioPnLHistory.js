import { getPnLHistory } from "@/frontend-BL/redux/actions/NewPortfolio/newPortfolio.ac";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFechNewPortfolioPnLHistory = ({ startTime, endTime, symbol }) => {
  const dispatch = useDispatch();
  const PnLHistory = useSelector((state) => state.PnLHistory);
  useEffect(() => {
    dispatch(getPnLHistory(startTime, endTime, symbol));
  }, [startTime, endTime, symbol]);

  return { PnLHistory };
};
