import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import TabHeader from "@/components/Setting/TabHeader";
import { REWARDCARD_GRID_CONTAINER_STYLE } from "./styles";
import VerificationBanner from "@/components/Setting/Rewards/VerificationBanner";
import { DataGrid } from "@mui/x-data-grid";
import { COLUMN_TASKREWARD_HISTORY, TASK_REWARD_SUBTITLE } from "../Constants";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import RewardCard from "@/components/Setting/Rewards/TaskRewardTab/RewardCard";
import { DATA_GRID_WRAPPER, TAB_HEADER_CONTENT_WRAPPER, TAB_HEADER_TITLE_WRAPPER } from "../styles";
import useTaskRewardDetails from "@/frontend-BL/businessHooks/SETTING/rewards/useTaskRewardDetails";

const Task_Reward = () => {
  const { taskRewardCards, taskRewardHistory, isUserVerified } = useTaskRewardDetails();
  return (
    <>
      {!isUserVerified && <VerificationBanner />}
      <Grid container sx={{ px: 1, position: "relative" }}>
        <Grid item xs={12}>
          <TabHeader>
            <Box sx={TAB_HEADER_CONTENT_WRAPPER}>
              <Box sx={TAB_HEADER_TITLE_WRAPPER}>
                <Typography variant={"SemiBold_32"} component={"h1"}>
                  {"Task Rewards"}
                </Typography>
                <Typography component={"p"}>{TASK_REWARD_SUBTITLE}</Typography>
              </Box>
            </Box>
          </TabHeader>
        </Grid>
        <Grid item xs={12}>
          {/* <Box sx={RADIO_BUTTONGROUP_WRAPPER}>
            <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={rewardStatus} onChange={handleRewardStatus}>
              <FormControlLabel value={STATUS_ONGOING} control={<Radio size="small" sx={{ color: "text.main" }} />} label="Ongoing" />
              <FormControlLabel value={STATUS_CLAIMED} control={<Radio size="small" sx={{ color: "text.main" }} />} label="Claimed" />
              <FormControlLabel value={STATUS_EXPIRED} control={<Radio size="small" sx={{ color: "text.main" }} />} label="Expired" />
            </RadioGroup>
          </Box> */}
          <Box paddingY={2}></Box>
          <Grid container sx={REWARDCARD_GRID_CONTAINER_STYLE} rowSpacing={{ sm: 2, md: 2, lg: 4 }} columnSpacing={{ sm: 2, md: 2, lg: 2 }}>
            {taskRewardCards.map((reward, index) => {
              return (
                <Grid key={index} item sm={12} md={12} lg sx={{ display: "flex", justifyContent: "flex-start", maxWidth: "360px !important" }}>
                  <RewardCard rewardName={reward.rewardName} rewardAmount={reward.reward} rewardStatus={reward.rewardStatus} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {
          <Grid item xs={12}>
            <Box paddingY={1}>
              <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
                {"Task Reward History"}
              </Typography>
            </Box>
            <Box sx={DATA_GRID_WRAPPER}>
              <DataGrid
                autoPageSize
                columns={COLUMN_TASKREWARD_HISTORY}
                rows={taskRewardHistory}
                getRowId={(row) => row.campaign}
                getRowClassName={() => "data-grid-rows"}
                components={{
                  NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
                }}
              />
            </Box>
          </Grid>
        }
      </Grid>
    </>
  );
};

export default Task_Reward;
