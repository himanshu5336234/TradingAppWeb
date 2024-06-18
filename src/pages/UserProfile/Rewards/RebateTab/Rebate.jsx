// eslint-disable-next-line no-unused-vars
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import Vector1 from "ASSETS/images/userSettings/ReferralTabs/Vector1.svg";
import Vector2 from "ASSETS/images/userSettings/ReferralTabs/Vector2.svg";
import Vector3 from "ASSETS/images/userSettings/ReferralTabs/Vector3.svg";
import TabHeader from "@/components/Setting/TabHeader";
import { useRebateDetails } from "@/frontend-BL/businessHooks/SETTING/rewards/useRebateDetails";
// eslint-disable-next-line no-unused-vars
import { useSelector } from "react-redux";
import VerificationBanner from "@/components/Setting/Rewards/VerificationBanner";
import InstructionCard from "@/components/Setting/Rewards/Refer&EarnTab/InstructionCard";
import { REBATE_GUIDE_LIST, REBATE_HISTORY_COLUMNS, REBATE_STEP_1, REBATE_STEP_2, REBATE_STEP_3 } from "../Constants";
import RewardGuide from "@/components/Setting/Rewards/RewardGuide";
import RebateDashboard from "@/components/Setting/Rewards/RebateTab/RebateDashboard";
import { DataGrid } from "@mui/x-data-grid";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { DATA_GRID_WRAPPER, HOW_IT_WORKS_WRAPPER, INSTRUCTION_CARD_FLEX, TAB_HEADER_CONTENT_WRAPPER, TAB_HEADER_TITLE_WRAPPER } from "../styles";

const Rebate = () => {
  // User Verification
  const verificationStatus = useSelector((state) => state.getKycDetails.getKycDetails?.status) === "VERIFIED";
  const { rebateEarnings, duration, changeDuration, changeRebateHistoryTablePage, changeRebateHistoryRows, rebateHistoryTablePagination, rebateHistory, totalCount } = useRebateDetails();
  return (
    <>
      {!verificationStatus && <VerificationBanner />}
      <Grid container rowSpacing={3} sx={{ px: 1 }}>
        <Grid item xs={12}>
          <TabHeader>
            <Box sx={TAB_HEADER_CONTENT_WRAPPER}>
              <Box sx={TAB_HEADER_TITLE_WRAPPER}>
                <Typography variant={"SemiBold_32"} component={"h1"}>
                  {"Trading Fee Rebate"}
                </Typography>
                <Typography component={"p"}>
                  {"Get rewarded for trading with us! Sign up using a referral code and receive a flat rebate of upto"}
                  <Typography color={"text.main"} variant="SemiBold_16" component={"span"}>
                    {" "}
                    {"20%"}{" "}
                  </Typography>
                  {"on trading fees. Get the Rebate Reward credited to wallet daily."}
                </Typography>
              </Box>
            </Box>
          </TabHeader>
        </Grid>
        {!verificationStatus && (
          <Grid item xs={12} sx={{ marginTop: 5 }}>
            <Box padding={1}>
              <Box sx={HOW_IT_WORKS_WRAPPER}>
                <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
                  {"How to Get Started ?"}
                </Typography>
                {/* <Link color="text.main">Learn More</Link> */}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs sx={INSTRUCTION_CARD_FLEX}>
                  <InstructionCard stepNo={1} instruction={REBATE_STEP_1} stepVector={Vector1} />
                </Grid>

                <Grid item xs sx={INSTRUCTION_CARD_FLEX}>
                  <InstructionCard stepNo={2} instruction={REBATE_STEP_2} stepVector={Vector2} />
                </Grid>

                <Grid item xs sx={INSTRUCTION_CARD_FLEX}>
                  <InstructionCard stepNo={3} instruction={REBATE_STEP_3} stepVector={Vector3} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        {verificationStatus && (
          <>
            <Grid item xs={12}>
              <Grid container>
                <Grid item sm={12} md={12} lg={6} padding={1}>
                  <RebateDashboard duration={duration} changeDuration={changeDuration} rebateEarnings={rebateEarnings} />
                </Grid>
                <Grid item sm={12} md={12} lg={6} padding={1}>
                  <RewardGuide guideList={REBATE_GUIDE_LIST} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box paddingY={1}>
                <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
                  {"Rebate History"}
                </Typography>
              </Box>
              <Box sx={DATA_GRID_WRAPPER}>
                <DataGrid
                  columns={REBATE_HISTORY_COLUMNS}
                  rows={rebateHistory}
                  rowCount={totalCount}
                  getRowId={(row) => row.internalId}
                  getRowClassName={() => "data-grid-rows"}
                  components={{
                    NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
                  }}
                  page={rebateHistoryTablePagination.page}
                  onPageChange={changeRebateHistoryTablePage}
                  pageSize={rebateHistoryTablePagination.rowsPerPage}
                  onPageSizeChange={changeRebateHistoryRows}
                  rowsPerPageOptions={[5, 10, 15]}
                  paginationMode="server"
                  pagination
                />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Rebate;
