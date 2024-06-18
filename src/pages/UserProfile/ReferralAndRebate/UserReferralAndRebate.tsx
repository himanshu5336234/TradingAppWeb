import React, { useState, useEffect } from "react";

import { Box, Tab, Tabs, TabProps, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ArrowRight from "@/assets/icons/Arrow-Right.svg";
import AnnouncementRebate from "@/assets/icons/Announcement-Rebate.svg";
import ArrowProceed from "@/assets/icons/ArrowProceed.svg";
import RebateGift from "@/assets/icons/RebateGift.svg";
import Verfied from "@/assets/icons/Verified.svg";

import ToggleGroup from "@/components/UI/ToggleGroup/ToggleGroup";
import BannerFormat from "@/components/PagesTopDataBanner/BannerFormat";
import CopyButton from "@/components/UI/CopyButton/CopyButton";
import TextView from "@/components/UI/TextView/TextView";

import { useReferralTab } from "@/frontend-BL/businessHooks/SETTING/rewards/useReferralTab";
import { useRebateDetails } from "@/frontend-BL/businessHooks/SETTING/rewards/useRebateDetails";

import KnowMoreModal from "./KnowMoreModal";

import { ReferralShareLinks } from "./ReferralShareLinks";
import TableCell from "@/components/SignalTrading/TableHeaderCell";
import TabelPagination from "@/components/SignalTrading/TablePagination";
import { ReferralRewardHistoryTableRow } from "./ReferralRewardHistoryTableRow";
import { ReferreeHistoryHistoryTableRow } from "./ReferreeHistoryTableRow";
import { RebateHistoryTableRow } from "./RebateHistoryTableRow";
import NoEntryOverlay from "./NoEntryOverlay";

const TabPrimary = styled(Tab)<TabProps>(({ theme }) => ({
  padding: "8px",
  textTransform: "none",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontSize: "12px",
  minHeight: 0,
  letterSpacing: "0.2px",
  opacity: "unset",
  "&:not(Mui-selected)": {
    color: "text.regular"
  },
  "&.Mui-selected": {
    color: "#ffffff"
  }
}));

export const NEXT_STEPS_TAB_STYLES = {
  backgroundColor: "text.highlight",
  px: 3,
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  py: 0.3,
  maxWidth: "100px"
};

const REFEREE_HISTORY_TABLE_HEADERS = [
  {
    id: "SIGN-UP DATE",
    gridSize: "2",
    name: "SIGN-UP DATE"
  },
  {
    id: "EMAIL",
    gridSize: "6",
    name: "EMAIL"
  },
  {
    id: "KYC",
    gridSize: "2",
    name: "KYC"
  },
  {
    id: "STATUS",
    gridSize: "2",
    name: "STATUS"
  }
];

const REFERRAL_REWARD_HISTORY_TABLE_HEADERS = [
  {
    id: "DATE",
    gridSize: "4",
    name: "DATE"
  },
  {
    id: "REWARD (USDT)",
    gridSize: "4",
    name: "REWARD (USDT)"
  },
  {
    id: "STATUS",
    gridSize: "4",
    name: "STATUS"
  }
];

const REBATE_HISTORY_TABLE_HEADERS = [
  {
    id: "DATE",
    name: "DATE",
    gridSize: "2.4"
  },
  {
    id: "REBATE CASHBACKN (USDT)",
    name: "REBATE CASHBACKN (USDT)",
    gridSize: "2.4"
  },
  {
    id: "FEE REBATE %",
    name: "FEE REBATE %",
    gridSize: "2.4"
  },
  {
    id: "TRADING FEE (USDT)",
    name: "TRADING FEE (USDT)",
    gridSize: "2.4"
  },
  {
    id: "STATUS",
    name: "STATUS",
    gridSize: "2.4"
  }
];

export const UserReferralAndRebate = () => {
  const navigate = useNavigate();

  const isKycVerified = useSelector((state: any) => state.getKycDetails?.getKycDetails?.status) === "VERIFIED";

  const [page, setPage] = useState(1);
  const [pageRebate, setPageRebate] = useState(1);
  const [showKnowMoreModal, setShowKnowMoreModal] = useState(false);

  const referralAndRebateTabs = [
    { id: "1", value: "Refer_and_Earn", label: "Refer and Earn" },
    { id: "2", value: "Trading_Fee_Rebate", label: "Trading Fee Rebate" }
  ];

  const durationTabs = [
    { id: "1", value: "", name: "ALL" },
    { id: "2", value: "day", name: "1D" },
    { id: "3", value: "week", name: "1W" },
    { id: "4", value: "month", name: "1M" }
  ];

  const [referralAndRebateTabValue, setReferralAndRebateTabValue] = useState("Refer_and_Earn");

  const { referralCode, ReferralDeepLinkUrl, refereeHistory, referralRewardHistory, totalCount, referralEarnings, changeReferralRewardTablePage, duration, changeDuration } = useReferralTab();

  const { rebateHistory, changeRebateHistoryTablePage, totalCountRebate, rebateEarnings } = useRebateDetails();

  useEffect(() => {
    changeReferralRewardTablePage(page);
  }, [page]);

  useEffect(() => {
    changeRebateHistoryTablePage(pageRebate);
  }, [pageRebate]);

  const BannerChildRefer =
    refereeHistory.length === 0 ? (
      <Box
        p={"1rem 1rem"}
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextView variant={"Medium_22"} style={{ marginBottom: "1rem" }} color={"text.default"} text={"Earn on Trading Volume"} />
        <TextView variant={"Regular_16"} color={"text.quaternary"} text={"The Density Referral program allows users to earn on the trading volume of your friends"} />
      </Box>
    ) : (
      <>
        <Box
          p={"1rem 1rem"}
          sx={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <TextView variant={"Regular_22"} style={{ marginBottom: "1rem" }} color={"text.default"} text={"My Dashboard"} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
              <TextView variant={"Regular_14"} text={"Level"} />
              <TextView variant={"Regular_22"} color={"text.highlight"} text={referralEarnings?.level || "--"} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
              <TextView variant={"Regular_14"} text={"My earnings (USDT)"} />
              <TextView variant={"Regular_22"} text={Number(referralEarnings?.totalReward)?.toFixed(3) || "--"} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
              <TextView variant={"Regular_14"} text={"Referee Volume"} />
              <TextView variant={"Regular_22"} text={Number(referralEarnings?.totalVolume)?.toFixed(3) || "--"} />
            </Box>
          </Box>
        </Box>
      </>
    );

  const BannerChildRebate =
    rebateHistory.length === 0 ? (
      <Box
        p={"1rem 1rem"}
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextView variant={"Medium_22"} style={{ marginBottom: "1rem" }} color={"text.default"} text={"Get rewarded for trading with us!"} />
        <TextView
          variant={"Regular_16"}
          color={"text.quaternary"}
          text={"Sign up using a referral code and recieve a full rebate of upto 20% on trading fees. Get the rebate reward credited to wallet daily"}
        />
      </Box>
    ) : (
      <Box
        p={"1rem 1rem"}
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TextView variant={"Regular_22"} style={{ marginBottom: "1rem" }} color={"text.default"} text={"My Dashboard"} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
            <TextView variant={"Regular_14"} text={"Rebate %"} />
            <TextView variant={"Regular_22"} color={"text.highlight"} text={String(Number(rebateEarnings?.totalRebateRate)?.toFixed(3)) || "--"} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
            <TextView variant={"Regular_14"} text={"My earnings (USDT)"} />
            <TextView variant={"Regular_22"} text={String(Number(rebateEarnings?.totalRebateReward)?.toFixed(3)) || "--"} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", marginRight: "4rem" }}>
            <TextView variant={"Regular_14"} text={"Fee (USDT)"} />
            <TextView variant={"Regular_22"} text={String(Number(rebateEarnings?.totalRebateFees)?.toFixed(3)) || "--"} />
          </Box>
        </Box>
      </Box>
    );

  return (
    <Box p={"2rem 6rem"}>
      <Box>
        <TextView variant={"Medium_14"} color={"text.secondary"} text={"Account / Referral & Rebate"} />
        <Box onClick={() => navigate(-1)} sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <Box component={"img"} src={ArrowRight} style={{ marginRight: "5px" }} />
          <TextView component={"h1"} variant={"Bold_40"} text={"Referral & Rebate"} />
        </Box>
      </Box>
      <Tabs sx={{ marginTop: "1rem", marginBottom: "1rem" }} value={referralAndRebateTabValue} onChange={(_, value) => setReferralAndRebateTabValue(value)} id="referralAndRebateTabs">
        {referralAndRebateTabs.map((data) => (
          <TabPrimary sx={{ minWidth: 200 }} value={data.value} label={data.label} key={data.id} />
        ))}
      </Tabs>
      {referralAndRebateTabValue === "Refer_and_Earn" ? (
        <>
          <ToggleGroup styles={{ minWidth: 80, marginBottom: 25 }} variant={"custom"} value={duration} handleChange={(_, value) => changeDuration(_, value)} values={durationTabs} />
          <BannerFormat child={BannerChildRefer} image={AnnouncementRebate} dataDetails={[]} />
        </>
      ) : (
        <BannerFormat child={BannerChildRebate} image={RebateGift} dataDetails={[]} />
      )}
      {isKycVerified && referralAndRebateTabValue === "Refer_and_Earn" && (
        <Box
          p={"1.5rem 3.5rem 1.5rem 3.5rem"}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "0px 0px 8px 8px",
            border: "1px solid #383840"
          }}
        >
          <Box>
            <TextView variant={"Regular_16"} style={{ marginRight: "2rem" }} text={"Referral Code"} />
            <TextView variant={"Regular_16"} color={"text.highlight"} text={referralCode} />
            <CopyButton copyText={referralCode} fontSize={"20px"} />
          </Box>
          <Box>
            <TextView variant={"Regular_16"} style={{ marginRight: "2rem" }} text={"Referral Link"} />
            <TextView variant={"Regular_16"} color={"text.highlight"} text={ReferralDeepLinkUrl} />
            <CopyButton copyText={ReferralDeepLinkUrl} fontSize={"20px"} />
            <ReferralShareLinks ReferralDeepLinkUrl={ReferralDeepLinkUrl} title={"Share via"} />
          </Box>
        </Box>
      )}
      {refereeHistory.length !== 0 && referralAndRebateTabValue === "Refer_and_Earn" && (
        <Box p={"2rem 2rem"} sx={{ display: "flex", flexDirection: "row" }}>
          <Grid container xs={8}>
            <Grid container p={"1rem 1.5rem 1rem 1.5rem"}>
              {REFEREE_HISTORY_TABLE_HEADERS.map((heading) => (
                <TableCell key={heading.id} heading={heading} />
              ))}
            </Grid>
            {refereeHistory?.map((data: any, index: number) => (
              <ReferreeHistoryHistoryTableRow date={data.date} kyc={data.kyc} index={index} status={data.status} email={data.email} />
            ))}
          </Grid>
          <Grid container xs={4} sx={{ border: "0.8px solid #44444D", borderRadius: "12px", display: "flex", flexDirection: "column" }}>
            <Grid container p={"1rem 1.5rem 1rem 1.5rem"}>
              {REFERRAL_REWARD_HISTORY_TABLE_HEADERS.map((heading) => (
                <TableCell key={heading.id} heading={heading} />
              ))}
            </Grid>
            {referralRewardHistory.length === 0 && <NoEntryOverlay message={"No Rewards Available"} />}
            {referralRewardHistory?.map((data: any, index: number) => (
              <ReferralRewardHistoryTableRow date={data.date} reward={data.reward} status={data.status} index={index} />
            ))}
            {totalCount > 0 && (
              <Grid container justifyContent={"flex-end"} marginTop={"auto"} paddingRight={"0.75rem"}>
                <TabelPagination page={page} totalPages={Math.ceil(totalCount / 5) || 1} setPage={setPage} />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      {rebateHistory.length !== 0 && referralAndRebateTabValue === "Trading_Fee_Rebate" && (
        <Box mt={"2rem"}>
          <Grid container p={"1rem 1.5rem 1rem 1.5rem"}>
            {REBATE_HISTORY_TABLE_HEADERS.map((heading) => (
              <TableCell key={heading.id} heading={heading} />
            ))}
          </Grid>
          {rebateHistory.length === 0 && <NoEntryOverlay message={"No Rewards Available"} />}
          {rebateHistory?.map((data, index) => (
            <RebateHistoryTableRow date={data.date} rebateCashback={data.rebateCashback} rebateRate={data.rebateRate} fee={data.fee} status={data.status} index={index} />
          ))}
          {totalCountRebate > 0 && (
            <Grid container mt={4} justifyContent={"flex-end"} marginTop={"auto"} paddingRight={"0.75rem"}>
              <TabelPagination page={pageRebate} totalPages={Math.ceil(totalCountRebate / 5) || 1} setPage={setPageRebate} />
            </Grid>
          )}
        </Box>
      )}
      {(referralAndRebateTabValue === "Trading_Fee_Rebate" && rebateHistory?.length !== 0) || (referralAndRebateTabValue === "Refer_and_Earn" && refereeHistory.length !== 0) ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2.5rem",
            justifyContent: "space-evenly",
            height: "168px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
            <TextView variant={"Bold_28"} text={"How does it work?"} />
            <Box component={"img"} src={ArrowProceed} />
          </Box>
          <Box
            p={"1rem 1rem 1rem 1rem"}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", backgroundColor: "background.primary", borderRadius: "4px", marginRight: "1rem" }}
          >
            <TextView variant={"Bold_16"} text={"Upto 20%"} />
            <TextView variant={"Medium_14"} color={"text.quaternary"} text={"Flat rebate of upto 20% on your trading fees"} />
          </Box>
          <Box
            p={"1rem 1rem 1rem 1rem"}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", backgroundColor: "background.primary", borderRadius: "4px", marginRight: "1rem" }}
          >
            <TextView variant={"Bold_16"} text={"Easy tracking"} />
            <TextView variant={"Medium_14"} color={"text.quaternary"} text={"Keep track of your earnings on a daily, weekly and a monthly basis"} />
          </Box>
          <Box
            p={"1rem 1rem 1rem 1rem"}
            sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", backgroundColor: "background.primary", borderRadius: "4px", marginRight: "1rem" }}
          >
            <TextView variant={"Bold_16"} text={"Daily Rebate Credits"} />
            <TextView variant={"Medium_14"} color={"text.quaternary"} text={"Rebate will be credited to your wallet on a daily basis"} />
          </Box>
          <Box p={"1rem 1rem 1rem 1rem"} sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", backgroundColor: "background.primary" }}>
            <TextView variant={"Bold_16"} text={"100USDT Volume"} />
            <TextView variant={"Medium_14"} color={"text.quaternary"} text={"Daily trading volume of 100USDT for eligibility"} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2.5rem",
            justifyContent: "space-evenly"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
            <TextView variant={"Bold_28"} text={"Steps to Get Started"} />
            <Box component={"img"} src={ArrowProceed} />
          </Box>
          <Box
            p={"1.5rem 2rem 1.5rem 2rem"}
            sx={{
              background: "linear-gradient(185deg, rgba(226, 255, 111, 0.12) -53.88%, rgba(54, 208, 104, 0.00) 165.2%);",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "260px",
              height: "236px",
              borderRadius: "4px",
              border: "0.2px solid #667d00"
            }}
          >
            <Box sx={{ ...NEXT_STEPS_TAB_STYLES, marginBottom: "12px" }}>
              <Typography color={"text.light"} variant={"SemiBold_12"}>
                {"STEP 01"}
              </Typography>
            </Box>
            <TextView variant={"Regular_16"} color={"text.highlight"} text={"Get Verified"} style={{ marginBottom: "12px" }} />
            <TextView variant={"Regular_14"} style={{ maxWidth: "168px", height: "5rem" }} text={"Get verified & share your referral code with friends"} />
            {!isKycVerified ? (
              <TextView onClick={() => navigate("/user/kyc")} variant={"SemiBold_14"} style={{ textDecoration: "underline", cursor: "pointer" }} text={"Start Verification"} />
            ) : (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box component={"img"} src={Verfied} sx={{ marginRight: "5px" }} />
                <TextView variant={"SemiBold_14"} color={"text.success"} text={"Verified"} />
              </Box>
            )}
          </Box>
          <Box
            p={"1.5rem 2rem 1.5rem 2rem"}
            sx={{
              background: "linear-gradient(185deg, rgba(226, 255, 111, 0.12) -53.88%, rgba(54, 208, 104, 0.00) 165.2%);",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "236px",
              borderRadius: "4px",
              border: "0.2px solid #667d00"
            }}
          >
            <Box sx={{ ...NEXT_STEPS_TAB_STYLES, marginBottom: "12px" }}>
              <Typography color={"text.light"} variant={"SemiBold_12"}>
                {"STEP 02"}
              </Typography>
            </Box>
            <TextView variant={"Regular_16"} color={"text.highlight"} text={"Invite Friends"} style={{ marginBottom: "12px" }} />
            <TextView variant={"Regular_14"} style={{ maxWidth: "168px", height: "5rem" }} text={"Invite friends to Sign up and start trading"} />
            <ReferralShareLinks ReferralDeepLinkUrl={ReferralDeepLinkUrl} title={"Share Invite Link"} />
          </Box>
          <Box
            p={"1.5rem 2rem 1.5rem 2rem"}
            sx={{
              background: "linear-gradient(185deg, rgba(226, 255, 111, 0.12) -53.88%, rgba(54, 208, 104, 0.00) 165.2%);",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "260px",
              height: "236px",
              borderRadius: "4px",
              border: "0.2px solid #667d00"
            }}
          >
            <Box sx={{ ...NEXT_STEPS_TAB_STYLES, marginBottom: "12px" }}>
              <Typography color={"text.light"} variant={"SemiBold_12"}>
                {"STEP 03"}
              </Typography>
            </Box>
            <TextView variant={"Regular_16"} color={"text.highlight"} text={"Earn 0.05%"} style={{ marginBottom: "12px" }} />
            <TextView
              variant={"Regular_14"}
              style={{ maxWidth: "168px", height: "5rem" }}
              text={"Invite friends to sign up and start trading. Earn upto 0.03% of the trading volume generate by them."}
            />
            <TextView onClick={() => setShowKnowMoreModal(true)} variant={"SemiBold_14"} style={{ textDecoration: "underline", cursor: "pointer" }} text={"Know More"} />
          </Box>
        </Box>
      )}
      <KnowMoreModal isOpen={showKnowMoreModal} setShowKnowMoreModal={setShowKnowMoreModal} />
    </Box>
  );
};
