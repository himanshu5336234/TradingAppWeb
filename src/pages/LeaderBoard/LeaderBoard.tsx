import React from "react";
import { Box, IconButton } from "@mui/material";
import LeaderBoardBanner from "@/components/LeaderBoard/LeaderBoardBanner";
import LeaderBoardTable from "@/components/LeaderBoard/LeaderBoardTable";
import { useLeaderBoardDetails } from "@/frontend-BL/businessHooks/LEADERBOARD/useLeaderBoardDetails";
import LeaderBoardActions from "@/components/LeaderBoard/LeaderBoardActions";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LeaderBoard: React.FC = () => {
  const { leaders, userRankDetail, tableData, duration, searchName, pageSize, handlePageSize, changeDuration, refreshScreen, debounceSearch, handleClearSearch, filterOptions, loading } =
    useLeaderBoardDetails();
  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <>
      <Box sx={{ p: { xs: "0px 0px", md: "2rem 6rem" } }}>
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={handleBackButton} sx={{ marginLeft: 0.5 }}>
            <ArrowBackIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </Box>
        <Box>
          <>
            {/* {isLoggedIn &&   <CompleteKycBanner />} */}

            <LeaderBoardBanner userRankDetail={userRankDetail} leaders={leaders} duration={duration} />

            <LeaderBoardActions
              duration={duration}
              changeDuration={changeDuration}
              searchName={searchName}
              handleSearch={debounceSearch}
              handleClearSearch={handleClearSearch}
              refreshScreen={refreshScreen}
              filterOptions={filterOptions}
            />

            <LeaderBoardTable tableData={tableData} pageSize={pageSize} changePageSize={handlePageSize} loading={loading} />
          </>
        </Box>
      </Box>
    </>
  );
};

export default LeaderBoard;
