import React from "react";
import { Grid } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import { useSelector } from "react-redux";
const TableHeadWrapperForAsksBids = () => {
  const { ChangeInAsset } = useSelector((state: any) => state.ChangeInAsset);
  const { selectedSymbol } = useSelector((state: any) => state.selectSymbol);
  return (
    <Grid mb={1} container direction="row" justifyContent="space-evenly" alignItems="center">
      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
          variant="Medium_11"
          component={"h6"}
          color={"text.regular"}
        >
          {"PRICE"}
        </TextView>
      </Grid>

      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
          variant="Medium_11"
          textAlign="center"
          component={"h4"}
          color={"text.regular"}
        >
          {`SIZE (${ChangeInAsset ? selectedSymbol.toUpperCase().replace("USDT", "") : "USDT"})`}
        </TextView>
      </Grid>
      <Grid item xs={4}>
        <TextView
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
          variant="Medium_11"
          textAlign={"end"}
          component={"h4"}
          color={"text.regular"}
        >
          {`SUM (${ChangeInAsset ? selectedSymbol.toUpperCase().replace("USDT", "") : "USDT"})`}
        </TextView>
      </Grid>
    </Grid>
  );
};
export default React.memo(TableHeadWrapperForAsksBids);
