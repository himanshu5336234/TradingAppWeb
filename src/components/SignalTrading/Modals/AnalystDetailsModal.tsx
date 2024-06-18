import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "@/components/CustomModals/newModal/CustomModal";
import TableCell from "../TableHeaderCell";
import SymbolCell from "../TableCells/SymbolCell";
import DateCell from "../TableCells/DateCell";
import SideCell from "../TableCells/SideCell";
import StatusCell from "../TableCells/StatusCell";
import ROICell from "../TableCells/ROICell";
import DemoProfile from "../../../assets/images/DemoProfile.svg";
import TablePagination from "../TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlltheSignalsAsAdmin } from "@/frontend-BL/redux/actions/SignalTrading/SignalTrading.ac";
import { PRICE_SUMMARY_HEADER } from "../signalTradingHeaders";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

const pageSize = 4;
interface Analyst {
  winRate: number;
  followersCount: number;
  roi: number;
  signalsGenerated: number;
  avatar: string;
  nickName: string;
  updatedAt: string;
  analystId: string;
}
interface GetCellProps {
  heading: string;
  value: string | number;
  gridSize: number;
  valSx?: Record<string, any>;
}
interface AnalystDetailsProps {
  IsOpen: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTnC: React.Dispatch<React.SetStateAction<boolean>>;
  analyst: Analyst;
  isFollowedAnalyst: boolean;
}

const AnalystDetailsModal: React.FC<AnalystDetailsProps> = ({ IsOpen, setShowDetails, setShowTnC, analyst, isFollowedAnalyst }) => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchAlltheSignalsAsAdmin({
        analystId: analyst.analystId,
        pageNumber: page,
        pageSize: pageSize
      })
    );
  }, [page]);

  const { signals, totalSignals } = useSelector((state: any) => state.SignalTrading.allSignalsAdmin);
  const { userType, analystStatus } = useSelector((state: any) => state.SignalTrading.userPersonna);
  const getDateFromTimestamp = (timeStamp: number): string => {
    const dt = new Date(timeStamp).getTime();
    const currDate = new Date().getTime();

    const days = Math.floor((currDate - dt) / (1000 * 60 * 60 * 24));
    if (days < 30) {
      return `${days} D`;
    }
    if (days >= 365) {
      return `${Math.floor(days / 365)} Y`;
    }

    return `${Math.floor(days / 30)} M`;
  };

  const GetCell: React.FC<GetCellProps> = ({ heading, value, gridSize, valSx }) => {
    return (
      <Grid
        item
        sx={{
          backgroundColor: "#0E0E0F",
          border: "1px solid #1B1B1F",
          py: 2,
          px: 1.5
        }}
        xs={gridSize}
      >
        <Typography variant="SemiBold_11" color={"text.secondary"}>
          {heading}
          <Typography component={"div"} sx={valSx} variant="SemiBold_12" color={"#fff"}>
            {value}
          </Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <CustomModal
      IsOpen={IsOpen}
      close={() => setShowDetails(false)}
      isClose={true}
      isPrimaryAction={true}
      isSecondaryAction={true}
      primaryName={isFollowedAnalyst ? "Following" : "Follow"}
      secondaryName={"Cancel"}
      secondaryAction={() => setShowDetails(false)}
      primaryDisabled={userType !== "NORMAL_USER" || (userType === "NORMAL_USER" && analystStatus === "PENDING")}
      primaryAction={() => {
        setShowDetails(false);
        setShowTnC(true);
      }}
      ContainerSx={{
        maxWidth: { lg: "720px", sm: "700px", xs: "350px" }
      }}
    >
      <Box p={2}>
        <Typography variant={"Medium_16"}>{"Analyst Profile"}</Typography>

        <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            my: 3
          }}
        >
          <img src={analyst.avatar || DemoProfile} alt="Demo Profile" width={"35px"} />
          <Typography variant="Medium_16">
            {analyst.nickName.trim() === "" ? "--" : analyst.nickName}
            <Typography component={"div"} variant="SemiBold_11" color={"text.secondary"}>
              {getDateFromTimestamp(analyst.updatedAt)}
            </Typography>
          </Typography>
        </Box>

        <Grid container width={"100%"} justifyContent={"space-between"} my={2}>
          <GetCell heading={"Followers"} value={analyst.followersCount} gridSize={3} />
          <GetCell
            heading={"ROI"}
            valSx={{
              color: analyst.roi > 0 ? "text.success" : analyst.roi < 0 ? "#FF6554" : "#FFF"
            }}
            value={`${analyst.roi.toFixed(2)} %`}
            gridSize={3}
          />
          <GetCell heading={"Total Signals"} value={analyst.signalsGenerated} gridSize={3} />
          <GetCell heading={"Win %"} value={`${analyst.winRate.toFixed(2)} %`} gridSize={3} />
        </Grid>

        <Typography variant="Medium_16">{"Signal History"}</Typography>

        <Grid container mt={3} mb={2} justifyContent={"space-between"}>
          {PRICE_SUMMARY_HEADER.map((heading) => (
            <TableCell key={heading.id} heading={heading} />
          ))}
        </Grid>
        {(!signals || signals?.length === 0) && <TableNoRowsOverlay message={"No Signal Data Available"} />}
        {signals?.length > 0 && (
          <Box height={"230px"}>
            {signals &&
              signals?.map((signal: any) => (
                <Grid container key={signal.signalId} mb={2} justifyContent={"space-between"}>
                  <DateCell value={signal.updatedAt} gridSize={2.5} />
                  <SymbolCell symbol={signal.symbol} gridSize={3.3} leverage={signal.leverage} marginMode={signal.marginMode.includes("ISOLATED") ? "ISOLATED" : "CROSS"} />
                  <SideCell side={signal.orderSide} gridSize={1.5} />
                  <ROICell roi={signal.signalPerformance} gridSize={1.5} />
                  <StatusCell status={signal.status} gridSize={3.2} />
                </Grid>
              ))}
          </Box>
        )}
        {signals?.length > 0 && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <TablePagination page={page} setPage={setPage} totalPages={Math.ceil(totalSignals / pageSize)} />
          </Box>
        )}
      </Box>
    </CustomModal>
  );
};

export default AnalystDetailsModal;
