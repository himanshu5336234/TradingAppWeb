import { Box, Card, CardContent, Collapse, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomModal from "../newModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { SETMARGINTYE } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import { SET_MARGIN_TYPE } from "@/frontend-BL/redux/constants/Constants";
import CrossWalletIcon from "@/assets/images/MarginTypeImages/CrossWalletIcon.svg";
import IsolatedWalletIcon from "@/assets/images/MarginTypeImages/IsolatedWalletIcon.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const IsolatedToCrossWallet = ({ marginType, symbol = "BTCUSDT", IsOpen, close }: { marginType: string; symbol: string; IsOpen: boolean; close: () => void }) => {
  const [marginTypeValue, setMarginTypeValue] = useState("ISOLATED");
  const allPositionsData = useSelector((state: any) => state.positionsDirectory.currentPositions);
  const [renderType, setRenderType] = useState("");
  const openOrdersData = useSelector((state: any) => state.futures.openOrders);
  const openOrdersSocketData = useSelector((state: any) => state.OpenOrdersStream.OpenOrdersStream);
  const [expandContent, setExpandContent] = useState(false);
  const dispatch = useDispatch();

  const getPositionAndOrderIndex = () => {
    // check positions array and open orders array for symbol
    const positionIndex = allPositionsData.findIndex((activePosition: { sym: string }) => activePosition.sym === symbol.toUpperCase());
    const openOrderIndex = openOrdersData.findIndex((activeOrder: { symbol: string }) => activeOrder.symbol === symbol.toUpperCase());
    const openOrderIndexFormStream = openOrdersSocketData.findIndex((activeOrder: { s: string }) => activeOrder.s === symbol.toUpperCase());
    return { positionIndex, openOrderIndex, openOrderIndexFormStream };
  };

  useEffect(() => {
    const tradeIndexes = getPositionAndOrderIndex();

    if (tradeIndexes.positionIndex === -1 && tradeIndexes.openOrderIndex === -1 && tradeIndexes.openOrderIndexFormStream === -1) {
      setRenderType("ChooseMarginTypeModal");
    } else {
      setRenderType("MarginTypeWarningModal");
    }

    if (marginType === "CROSS") {
      setMarginTypeValue("CROSS");
    }
  }, [marginType]);

  const handleModalPrimaryAction = () => {
    if (renderType === "ChooseMarginTypeModal") {
      dispatch(
        SETMARGINTYE(
          {
            marginType: marginTypeValue.toUpperCase(),
            symbol: symbol.toUpperCase()
          },
          callBack
        )
      );
    }
    close();
  };
  const callBack = (symbol: string, marginType: string) => {
    dispatch({
      type: SET_MARGIN_TYPE,
      payload: {
        sym: symbol,
        marginType: marginType.toUpperCase()
      }
    });
  };

  const ChooseMarginTypeModal = () => {
    return (
      <Box sx={{ maxWidth: "500px", margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <Typography component={"p"} color={"text.mild"} variant="Regular_16">
            {"Margin Mode :   "}
          </Typography>
          <Typography variant="SemiBold_16" component={"p"}>
            &nbsp;{symbol.toUpperCase()}
          </Typography>
        </Box>
        <Grid container gap={1} justifyContent={"space-between"} my={2}>
          <Grid item xs={5.8}>
            <Card
              id="isolatedTocrossWallet-crossCard"
              sx={{
                backgroundImage: "none",
                backgroundColor: marginTypeValue === "CROSS" ? "background.tertiary" : "background.default",
                cursor: "pointer",
                boxShadow: marginTypeValue !== "CROSS" && "4px 4px 4px 0px #00000040"
              }}
              onClick={() => setMarginTypeValue("CROSS")}
            >
              <CardContent
                id="isolatedTocrossWallet-crossContent"
                sx={{
                  px: "20px",
                  py: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  ":last-child": { py: "16px", px: "10px" }
                }}
              >
                <Box id="cross-shared-margin" component={"img"} src={CrossWalletIcon} sx={{ fontSize: "20px" }} />
                <Box>
                  <Typography variant="SemiBold_16" component={"p"}>
                    {"CROSS"}
                  </Typography>
                  <Typography variant="Regular_12" color="text.mild" component={"p"}>
                    {"Shared Margin"}
                  </Typography>
                </Box>
              </CardContent>
              <Collapse in={expandContent} timeout="auto" unmountOnExit>
                <CardContent sx={{ ":last-child": { pt: "0px", px: "10px" } }}>
                  <Box
                    sx={{
                      borderBlock: "0.8px solid #5C5C5C",
                      py: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        Reduce chances of liquidation
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        Manage ill-effects of highly volatile market
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        Hedge position risk. Suggested for pro traders.
                      </Typography>
                    </Box>
                  </Box>
                  <Box color="text.mild" sx={{ pt: "16px" }}>
                    <Typography component={"p"} variant="Regular_10">
                      <Typography color="#ECA233" variant="Regular_10" component={"span"}>
                        WARNING &nbsp;
                      </Typography>
                      In case of liquidation, whole wallet is liquidated along with all cross positions and open orders are cancelled
                    </Typography>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          <Grid id="isolated-grid" item xs={12} md={5.8}>
            <Card
              id="isolatedTocrossWallet-isolatedCard"
              sx={{
                backgroundImage: "none",
                boxShadow: marginTypeValue === "CROSS" && "4px 4px 4px 0px #00000040",
                backgroundColor: marginTypeValue !== "CROSS" ? "background.tertiary" : "background.default",
                cursor: "pointer"
              }}
              onClick={() => setMarginTypeValue("ISOLATED")}
            >
              <CardContent
                id="isolatedTocrossWallet-isolatedContent"
                sx={{
                  px: "20px",
                  py: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  ":last-child": { py: "16px", px: "20px" }
                }}
              >
                <Box id="Isolated-individual-margin" component={"img"} src={IsolatedWalletIcon} sx={{ fontSize: "20px" }} />
                <Box>
                  <Typography variant="SemiBold_16" component={"p"}>
                    {"ISOLATED"}
                  </Typography>
                  <Typography variant="Regular_12" color="text.mild" component={"p"}>
                    {"Individual Margin"}
                  </Typography>
                </Box>
              </CardContent>
              <Collapse in={expandContent} timeout="auto" unmountOnExit>
                <CardContent sx={{ ":last-child": { pt: "0px", px: "10px" } }}>
                  <Box
                    sx={{
                      borderBlock: "0.8px solid #5C5C5C",
                      py: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        Preferred for amateur traders
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        Each position is allocated separate wallet
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
                      <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                      <Typography variant="Regular_11" component={"p"}>
                        No spillover of Liquidation and Risk of one position to other
                      </Typography>
                    </Box>
                  </Box>
                  <Box color="text.mild" sx={{ pt: "16px" }}>
                    <Typography component={"p"} variant="Regular_10">
                      <Typography color="text.mild" variant="Regular_10" component={"span"}>
                        WARNING &nbsp;
                      </Typography>
                      In case of high volatility, there is a high risk of liquidation if risk is not managed properly
                    </Typography>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          <Grid item xs={12} justifyContent={"center"}>
            <Box onClick={() => setExpandContent(!expandContent)} sx={{ cursor: "pointer" }}>
              {!expandContent && (
                <Box m={"auto"}>
                  <Typography sx={{ textDecoration: "underline" }} variant="Bold_14" component={"p"} my={2} textAlign={"center"}>
                    view more
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="Regular_12" component={"p"} color="text.secondary">
              <Typography variant="Medium_12" component={"span"} color="text.main">
                {"Note"}&nbsp;
              </Typography>
              Switching the margin mode will only apply it to the selected contract. The margin mode cannot be changed while you have an open order/position.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const MarginTypeWarningModal = () => {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            gap: "30px",
            pb: 3
          }}
        >
          <Box sx={{ width: "10%" }}>
            <ReportProblemIcon sx={{ fontSize: "55px", color: "#ECA233", mr: "10px", mt: 0.5 }} />
          </Box>
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            <Typography variant="SemiBold_24" component={"p"}>
              {"Margin Mode Cannot Be Changed"}
            </Typography>
            <Typography variant="Regular_16" component={"p"} color="text.mild">
              {`Margin mode cannot be changed if there are open position or open orders. Please close the existing position or orders of`}
              <Typography variant="Regular_16" component={"span"} color="text.main">
                &nbsp;{symbol.toUpperCase()}&nbsp;
              </Typography>
              {"to change the margin mode"}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <CustomModal
      ContainerSx={{ maxWidth: { sm: "500px" } }}
      isClose={true}
      isSecondaryAction={true}
      secondaryAction={close}
      secondaryName={"Dismiss"}
      close={close}
      IsOpen={IsOpen}
      primaryName={renderType === "ChooseMarginTypeModal" ? "Confirm" : "Ok"}
      isPrimaryAction={true}
      isDisabled={marginTypeValue === marginType && renderType === "ChooseMarginTypeModal"}
      primaryAction={handleModalPrimaryAction}
    >
      {renderType === "ChooseMarginTypeModal" && <ChooseMarginTypeModal />}
      {renderType === "MarginTypeWarningModal" && <MarginTypeWarningModal />}
    </CustomModal>
  );
};
IsolatedToCrossWallet.propTypes = {
  IsOpen: PropTypes.bool,
  marginType: PropTypes.string,
  close: PropTypes.func,
  primaryName: PropTypes.string,
  primaryAction: PropTypes.func,
  isClose: PropTypes.bool,
  isPrimaryAction: PropTypes.bool,
  symbol: PropTypes.string
};
export default IsolatedToCrossWallet;
