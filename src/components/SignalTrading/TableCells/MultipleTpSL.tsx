import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ShowIcon } from "../../../assets/images/Show.svg";
import TPSLModal from "../Follower/Modals/TPSLModal";
import { Eyeicon } from "@/assets/icons";

interface SignalTPSLProps {
  SLStopPrice: number;
  TPStopPrice: number;
}
interface SignalDataProps {
  stopLossStopPrice: number;
  takeProfitStopPrice: number;
  SignalTPSL: SignalTPSLProps[];
}
interface Data {
  signalData: SignalDataProps;
}

interface TPSLCellProps {
  gridSize: number;
  data: Data;
}

const MultipleTPSLCell: React.FC<TPSLCellProps> = ({ gridSize, data }) => {
  const [showTPSLModal, setShowTPSLModal] = useState(false);
  const [signalTPSL, setSignalTPSL] = useState<SignalTPSLProps[]>([]);

  useEffect(() => {
    if (data.signalData.SignalTPSL.length === 0) {
      setSignalTPSL([
        {
          SLStopPrice: data.signalData.stopLossStopPrice,
          TPStopPrice: data.signalData.takeProfitStopPrice
        }
      ]);
    } else {
      setSignalTPSL(data.signalData.SignalTPSL);
    }
  }, [data.signalData.SignalTPSL]);
  return (
    <>
      {/* <TPSLCell gridSize={gridSize} takeProfit={data.signalData.takeProfitStopPrice} stopLoss={data.signalData.stopLossStopPrice} status={""}  /> */}
      <Grid item container xs={gridSize} alignItems={"center"} gap={2}>
        <Typography variant="Regular_14">{signalTPSL.length > 0 ? signalTPSL.length + " Placed" : "--"}</Typography>
        {signalTPSL.length > 0 && <Box component={"img"} src={Eyeicon} alt="Edit Icon" sx={{ cursor: "pointer" }} onClick={() => setShowTPSLModal(true)} />}
      </Grid>
      {showTPSLModal && <TPSLModal data={data} signalTPSL={signalTPSL} IsOpen={showTPSLModal} setShowTPSLModal={setShowTPSLModal} />}
    </>
  );
};

export default MultipleTPSLCell;
