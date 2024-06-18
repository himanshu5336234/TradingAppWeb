/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import React from "react";
import Vector1 from "ASSETS/images/userSettings/ReferralTabs/Vector1.svg";
import Vector2 from "ASSETS/images/userSettings/ReferralTabs/Vector2.svg";
import Vector3 from "ASSETS/images/userSettings/ReferralTabs/Vector3.svg";
import InstructionCard from "@/components/Setting/Rewards/Refer&EarnTab/InstructionCard";
import TabHeader from "@/components/Setting/TabHeader";
import { COLUMN_REFEREE_HISTORY, COLUMN_REFERRALREWARD_HISTORY, REFERRAL_STEP_1, REFERRAL_STEP_2, REFERRAL_STEP_3, REFER_GUIDE_LIST, KYC_CTA_TEXT, REFER_SUBTITLE } from "./Constants";
import ReferralCode from "@/components/Setting/Rewards/Refer&EarnTab/ReferralCode";
import useMediaQuery from "@mui/material/useMediaQuery";
import VerificationBanner from "@/components/Setting/Rewards/VerificationBanner";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import RewardGuide from "@/components/Setting/Rewards/RewardGuide";
import ReferralDashboard from "@/components/Setting/Rewards/Refer&EarnTab/ReferralDashboard";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import { useReferralTab } from "@/frontend-BL/businessHooks/SETTING/rewards/useReferralTab";
import { DATA_GRID_WRAPPER, HEADER_REFERRAL_CODE_CARD_WRAPPER, HOW_IT_WORKS_WRAPPER, INSTRUCTION_CARD_FLEX, KYC_CTA_BUTTON, TAB_HEADER_CONTENT_WRAPPER, TAB_HEADER_TITLE_WRAPPER } from "./styles";
import { useSelector } from "react-redux";

const Referral = () => {
  // states & props
  const matchesLaptopWidth = useMediaQuery("(min-width:1200px)");
  // User Verification
  const verificationStatus = useSelector((state) => state.getKycDetails.getKycDetails?.status) === "VERIFIED";
  const navigate = useNavigate();
  const {
    referralCode,
    referralEarnings,
    referralRewardHistory,
    refereeHistory,
    duration,
    changeDuration,
    refereeHistoryTable,
    referralRewardTable,
    totalCount,
    changeRefereeHistoryTablePage,
    changeRefereeHistoryTableRows,
    changeReferralRewardTablePage,
    changeReferralRewardTableRows,
    ReferralDeepLinkUrl
  } = useReferralTab();

  return (
    <>
      {!verificationStatus && <VerificationBanner />}

      <Grid container rowSpacing={3} sx={{ px: 1 }}>
        <Grid item xs={12}>
          <TabHeader>
            <Box sx={TAB_HEADER_CONTENT_WRAPPER}>
              <Box sx={TAB_HEADER_TITLE_WRAPPER}>
                <Typography variant={"SemiBold_32"} component={"h1"}>
                  {"Refer & Earn"}
                </Typography>
                <Typography component={"p"}>{REFER_SUBTITLE}</Typography>
              </Box>
              {verificationStatus && (
                <Box sx={HEADER_REFERRAL_CODE_CARD_WRAPPER}>
                  <ReferralCode referralCode={referralCode} referralUrl={ReferralDeepLinkUrl} />
                </Box>
              )}
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
                  <InstructionCard stepNo={1} instruction={REFERRAL_STEP_1} stepVector={Vector1} />
                </Grid>

                <Grid item xs sx={INSTRUCTION_CARD_FLEX}>
                  <InstructionCard stepNo={2} instruction={REFERRAL_STEP_2} stepVector={Vector2} />
                </Grid>

                <Grid item xs sx={INSTRUCTION_CARD_FLEX}>
                  <InstructionCard stepNo={3} instruction={REFERRAL_STEP_3} stepVector={Vector3} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
        {verificationStatus && (
          <>
            <Grid item xs={12}>
              <Grid container gap="15px" justifyContent="space-between" px={2}>
                {!matchesLaptopWidth && (
                  <Grid item sm={12}>
                    <ReferralCode referralCode={referralCode} referralUrl={ReferralDeepLinkUrl} />
                  </Grid>
                )}
                <Grid item sm={12} lg={6}>
                  <ReferralDashboard duration={duration} changeDuration={changeDuration} referralEarnings={referralEarnings} />
                </Grid>
                <Grid item sm={12} lg={5.5}>
                  <RewardGuide guideList={REFER_GUIDE_LIST} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} px={2}>
              <Grid container justifyContent={"space-between"}>
                <Grid item xs={12} lg={6.5}>
                  <Box paddingY={1}>
                    <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
                      {"Referral History"}
                    </Typography>
                  </Box>
                  <Box sx={DATA_GRID_WRAPPER}>
                    <DataGrid
                      columns={COLUMN_REFEREE_HISTORY}
                      rows={refereeHistory ?? []}
                      getRowId={(row) => row.email}
                      getRowClassName={() => "data-grid-rows"}
                      components={{
                        NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
                      }}
                      page={refereeHistoryTable.page}
                      onPageChange={changeRefereeHistoryTablePage}
                      pageSize={refereeHistoryTable.rowsPerPage}
                      onPageSizeChange={changeRefereeHistoryTableRows}
                      rowsPerPageOptions={[5, 10, 15]}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={5}>
                  <Box paddingY={1}>
                    <Typography variant={"SemiBold_28"} component={"h2"} paddingY={2}>
                      {"Reward History"}
                    </Typography>
                  </Box>
                  <Box sx={{ ...DATA_GRID_WRAPPER }}>
                    <DataGrid
                      columns={COLUMN_REFERRALREWARD_HISTORY}
                      rowCount={totalCount}
                      rows={referralRewardHistory}
                      getRowId={(row) => row.internalId}
                      getRowClassName={() => "data-grid-rows"}
                      components={{
                        NoRowsOverlay: () => <TableNoRowsOverlay message="No Active Data" />
                      }}
                      page={referralRewardTable.page}
                      onPageChange={changeReferralRewardTablePage}
                      pageSize={referralRewardTable.rowsPerPage}
                      onPageSizeChange={changeReferralRewardTableRows}
                      rowsPerPageOptions={[5, 10, 15]}
                      paginationMode="server"
                      pagination
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Referral;
