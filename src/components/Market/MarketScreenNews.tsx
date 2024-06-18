import { Box, Table, TableContainer, TableFooter, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import TableNoRowsOverlay from "../Setting/Rewards/TableNoRowsOverlay";
import { tablePaginationStyle } from "../Home/UserActivities/UserTabs/UserTabs.style";
import ToggleGroup from "../UI/ToggleGroup/ToggleGroup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FETCH_MARKET_NEWS } from "@/frontend-BL/redux/actions/Market/getMarketData.ac";

const MarketScreenNews = () => {
  const [topic, setTopic] = useState("all");
  const [marketNewsData, setMarketNewsData] = useState([]);
  const [loader, setloader] = useState(true);
  const dispatch = useDispatch();

  const [marketNewsPagination, setMarketNewsPagination] = useState({
    page: 1,
    rowsPerPage: 10
  });
  const [alignment, setAlignment] = useState("all");
  const navigate = useNavigate();
  const renderNewsCard = () => {
    // .slice(marketNewsPagination.page * marketNewsPagination.rowsPerPage, marketNewsPagination.page * marketNewsPagination.rowsPerPage + marketNewsPagination.rowsPerPage)
    if (marketNewsData && marketNewsData.length > 0) {
      // eslint-disable-next-line array-callback-return
      return marketNewsData
        .slice(marketNewsPagination.page * marketNewsPagination.rowsPerPage, marketNewsPagination.page * marketNewsPagination.rowsPerPage + marketNewsPagination.rowsPerPage)
        .map((news, index) => <NewsCard key={news.title} news={news} addBackgroundColor={(index + 1) % 2 === 0} />);
    } else {
      return <TableNoRowsOverlay message={"no data found"} />;
    }
  };

  useEffect(() => {
    const newsTopic = topic === "all" ? "" : topic;
    dispatch(FETCH_MARKET_NEWS({ topic: newsTopic, setloader })).then((res: any) => {
      setMarketNewsData(res.data);
    });
  }, [topic]);

  return (
    <Box sx={{ p: { xs: "0px 0px", md: "2rem 6rem" } }}>
      <Box sx={{ display: "flex", alignItems: "center", marginLeft: "16px", marginBottom: "40px" }}>
        <Typography sx={{ fontSize: "32px", cursor: "pointer" }} component={"p"} onClick={() => navigate(-1)}>
          &#8592;
        </Typography>
        <Typography variant="headlineMedium">Around the Crypto World</Typography>
      </Box>
      <Box
        sx={{
          marginTop: "8px",
          marginLeft: "16px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <ToggleGroup
          value={alignment}
          handleChange={(e, val) => {
            if (!val) return;
            setAlignment(val);
            setMarketNewsPagination({ ...marketNewsPagination, page: 0 });
            setTopic(val);
          }}
          values={[
            { name: "All", value: "all" },
            { name: "Trending", value: "trending" }
          ]}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "16px",
          overflow: "scroll"
        }}
      >
        {renderNewsCard()}
      </Box>
      <Box mb={1}>
        <TableContainer>
          <Table>
            <TableFooter>
              <TableRow id="tablePagination">
                <TablePagination
                  sx={tablePaginationStyle}
                  id="tablePaginationCell"
                  labelRowsPerPage="Results per view"
                  rowsPerPageOptions={[5, 10, 20]}
                  count={marketNewsData.length}
                  rowsPerPage={marketNewsPagination.rowsPerPage}
                  page={marketNewsPagination.page}
                  onPageChange={(event, newPage) =>
                    setMarketNewsPagination({
                      ...marketNewsPagination,
                      page: newPage
                    })
                  }
                  onRowsPerPageChange={(event) => {
                    setMarketNewsPagination({
                      ...marketNewsPagination,
                      rowsPerPage: event.target.value,
                      page: 0
                    });
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MarketScreenNews;
