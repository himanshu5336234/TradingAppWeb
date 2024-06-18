import TextView from "@/components/UI/TextView/TextView";
import { Box, Tooltip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import React from "react";
import { PnlLineChart } from "../PnlLineChart";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";

const DailyPnLChart = ({ graphData }: { graphData: { labels: string[]; datasetOne: number[]; datasetTwo: number[] } }) => {
  return (
    <Box width={"100%"}>
      {graphData.datasetOne.length <= 1 ? (
        <Box height={300}>
          <TableNoRowsOverlay message={"No Active Data"} />
        </Box>
      ) : (
        <>
          <Box display="flex" flexDirection={"row"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
            <TextView text={"P&L (USDT)"} component="p" variant="Medium_14" color="text.regular" />
            <Box display={"flex"} gap="24px">
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "text.quaternary",
                      fontSize: "11px",
                      backgroundColor: "background.tertiary",
                      fontWeight: 600,
                      p: "8px",
                      maxWidth: 160
                    }
                  }
                }}
                title={"Realised P&L excluding all Fee, for the specific date"}
                arrow
                placement="top"
              >
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <FiberManualRecordIcon sx={{ width: 10, height: 10, color: "#A044FE" }} />
                  <TextView text={"Gross Daily P&L"} component="span" variant="Medium_14" color="text.regular" />
                </Box>
              </Tooltip>
              <Tooltip
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "text.quaternary",
                      fontSize: "11px",
                      backgroundColor: "background.tertiary",
                      fontWeight: 600,
                      p: "8px",
                      maxWidth: 160
                    }
                  }
                }}
                title={"Realised P&L including all Fee, for the specific date"}
                arrow
                placement="top"
              >
                <Box display={"flex"} gap={1} alignItems={"center"}>
                  <FiberManualRecordIcon sx={{ width: 10, height: 10, color: "#C0DF5A" }} />
                  <TextView text={"Net Daily P&L"} component="span" variant="Medium_14" color="text.regular" />
                </Box>
              </Tooltip>
            </Box>
          </Box>
          <Box width={"100%"} height={400} display={"flex"} ml={2.6}>
            <PnlLineChart graphData={graphData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DailyPnLChart;
