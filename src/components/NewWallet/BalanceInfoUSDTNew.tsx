import React from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSelector } from "react-redux";
import { numberWithCommas } from "@/helpers/commaHelper";
import TextView from "@/components/UI/TextView/TextView";
interface GridCellProps {
  title: string;
  value: string;
  toolTipTitle: string;
  gridSize: number;
}

const GetGridCell: React.FC<GridCellProps> = ({ title, value, toolTipTitle, gridSize }) => {
  return (
    <Grid px={1} py={3} item sx={{ border: "1px solid", borderColor: "background.tertiary" }} container xs={gridSize}>
      <TextView variant="Medium_14" color={"text.regular"}>
        {title}
        <Tooltip placement="top" title={toolTipTitle}>
          <IconButton sx={{ color: "grey" }}>
            <InfoOutlinedIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Tooltip>
        <TextView variant="Medium_16" color={"text.primary"} component={"div"} text={numberWithCommas(Number(value)?.toFixed(2))}></TextView>
      </TextView>
    </Grid>
  );
};

const BalanceInfoUSDTNew = () => {
  const { availableBalance, totalIsolatedWalletBalance, totalCrossWalletBalance, maxWithdrawAmount } = useSelector((state: any) => ({
    totalCrossWalletBalance: state.futures.accountInfo.totalCrossWalletBalance,
    totalIsolatedWalletBalance: state.futures.accountInfo.totalIsolatedWalletBalance,
    maxWithdrawAmount: state.futures.accountInfo.maxWithdrawAmount,
    availableBalance: state.futures.accountInfo.availableBalance
  }));

  return (
    <Grid container>
      <GetGridCell
        title={"Available Balance(USDT)"}
        value={availableBalance}
        toolTipTitle={`Free Balance available for placing the New Orders. It is updated on real time basis, hence there might be some discrepancy.`}
        gridSize={3}
      />
      <GetGridCell
        title={"Cross Wallet Balance(USDT)"}
        value={totalCrossWalletBalance}
        toolTipTitle={`Amount that is allocated to Cross Wallet. It is shared across all the Cross Mode positions and orders.`}
        gridSize={3}
      />
      <GetGridCell
        title={"Withdraw-able Balance(USDT)"}
        value={maxWithdrawAmount}
        toolTipTitle={`Amount that can be withdrawn, equal to Available balance - Frozen balance (received via rewards).*There can be some discrepancy in the data shown.`}
        gridSize={3}
      />
      <GetGridCell title={"Isolated Margin(USDT)"} value={totalIsolatedWalletBalance} toolTipTitle={`It is the sum of all Isolated Margins of your positions`} gridSize={3} />
    </Grid>
  );
};

export default BalanceInfoUSDTNew;
