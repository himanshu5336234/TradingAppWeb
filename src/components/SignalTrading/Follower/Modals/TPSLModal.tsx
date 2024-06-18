import React from "react";
// import CustomModal from "@/components/UI/Molecules/Modal/Modal";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import OrderDetails from "../../Modals/OrderDetails";
import { Box, Typography } from "@mui/material";
import TPSLSliderBox from "../../Modals/TPSLSliderBox";
interface TPSLModalProps {
  IsOpen: boolean;
  setShowTPSLModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Object;
  signalTPSL: any[];
}

const TPSLModal: React.FC<TPSLModalProps> = ({ IsOpen, setShowTPSLModal, data, signalTPSL }) => {
  // const [activeStep, setActiveStep] = useState(0);
  return (
    <CustomModal IsOpen={IsOpen} close={() => setShowTPSLModal(false)} isClose={true}>
      <Box p={2}>
        <Typography variant={"Medium_16"}>
          {"Take Profit/ Stop Loss-"}
          <Typography component={"span"} color={"text.secondary"}>
            {"Position"}
          </Typography>
        </Typography>
        <OrderDetails modalType={"LIMIT_PRICE"} symbol={data.signalData.symbol} limitPrice={data.signalData.orderPrice} showTriggerPrice={false} side={data.signalData.orderSide} />
        <TPSLSliderBox entryPrice={data.signalData.orderPrice} side={data.signalData.orderSide} TPSLData={signalTPSL} isFollower={true} symbol={data.signalData.symbol} />
      </Box>
    </CustomModal>
  );
};

export default TPSLModal;
