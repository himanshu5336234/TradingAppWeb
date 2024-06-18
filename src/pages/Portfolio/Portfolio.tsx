import TextView from "@/components/UI/TextView/TextView";
import { Grid, Stack } from "@mui/material";
import PortfolioSummaryCard from "@/components/Portfolio/PortfolioSummaryCard";
import React, { useState } from "react";
import DailyPnl from "@/components/Portfolio/DailyPnL/DailyPnL";
import BestPerformerCard from "@/components/Portfolio/BestPerformerCard";
import FavouritePairCard from "@/components/Portfolio/FavouritePairCard";
import DownloadHistoryModal from "@/components/CustomModals/newModal/DownloadHistoryModal";
import usePollingServiceForDownloadHistory from "@/frontend-BL/services/PollingService/usePollingServiceForDownloadHistory";
import { getSupportChat } from "@/helpers";
import CummulativePnL from "@/components/Portfolio/CumulativePnL";

const Portfolio = () => {
  const [refreshStates, setRefreshStates] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadDateRange, setDownloadDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 1)).getTime(),
    to: new Date().getTime()
  });
  const { loaderData, getDownloadID, setLoaderData } = usePollingServiceForDownloadHistory();
  const handleDownloadCSV = () => {
    setShowDownloadModal(false);
    getDownloadID({
      startTime: downloadDateRange.from,
      endTime: downloadDateRange.to,
      historyType: "Portfolio_PNL"
    });
  };

  const { openFcSupportChat } = getSupportChat();
  return (
    <Grid container direction={"column"} alignItems={"center"} spacing={5.5} p={"2rem 6rem"}>
      <Grid item>
        <Stack width={"100%"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
          <TextView
            component={"h6"}
            onClick={() => setShowDownloadModal(true)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              padding: "7.5px 12px"
            }}
            text={"Download Daily P&L"}
            variant="Medium_12"
          />
          <TextView
            component={"h6"}
            onClick={() => setRefreshStates((prevCount) => !prevCount)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              padding: "7.5px 12px"
            }}
            text={"Refresh"}
            variant="Medium_12"
          />
        </Stack>
        <PortfolioSummaryCard refreshState={refreshStates} />
      </Grid>
      <Grid item>
        <CummulativePnL refreshState={refreshStates} />
      </Grid>
      <Grid item>
        <DailyPnl refreshState={refreshStates} />
      </Grid>
      <Grid item display={"flex"} gap={2} flexDirection={{ xs: "column", lg: "row" }}>
        <FavouritePairCard refreshState={refreshStates} />
        <BestPerformerCard refreshState={refreshStates} />
      </Grid>
      {/* Download Modals */}
      <DownloadHistoryModal
        IsOpen={showDownloadModal}
        isPrimaryAction={true}
        isSecondaryAction={true}
        primaryName="Download"
        secondaryName="Cancel"
        secondaryAction={() => {
          setShowDownloadModal(false);
        }}
        primaryAction={() => {
          if (downloadDateRange.from && downloadDateRange.to) {
            handleDownloadCSV();
          }
        }}
        setDateRange={setDownloadDateRange}
        type="SET_PERIOD"
        dateRange={downloadDateRange}
        title="USDT Transaction History"
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isLoadingOpen}
        title={"USDT Transaction History"}
        isSecondaryAction={false}
        isPrimaryAction={false}
        type={"REQUESTED"}
        close={() =>
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          })
        }
        dateRange={downloadDateRange}
      />
      <DownloadHistoryModal
        IsOpen={loaderData.isFailedOpen}
        title={"USDT Transaction History"}
        type={"DOWNLOAD_FAILED"}
        isSecondaryAction={true}
        isPrimaryAction={true}
        secondaryAction={() => {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
        primaryName="Support"
        secondaryName="OK"
        close={() => {
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
        dateRange={downloadDateRange}
        primaryAction={() => {
          openFcSupportChat();
          setLoaderData({
            ...loaderData,
            isLoadingOpen: false,
            isFailedOpen: false
          });
        }}
      />
    </Grid>
  );
};

export default Portfolio;
