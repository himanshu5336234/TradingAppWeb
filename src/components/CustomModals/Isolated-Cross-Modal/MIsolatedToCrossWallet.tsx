import { Box, Drawer, Grid, Card, CardContent, Collapse, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomModal from "../newModal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { SETMARGINTYE } from "@/frontend-BL/redux/actions/Futures/Futures.ac";
import { SET_MARGIN_TYPE } from "@/frontend-BL/redux/constants/Constants";
// import { MARGIN_TYPE_CARD, MARGIN_TYPE_SELECT_BOX, MODAL_BODY_STYLE } from "./Styles";
import CrossWalletIcon from "@/assets/images/MarginTypeImages/CrossWalletIcon.svg";
import IsolatedWalletIcon from "@/assets/images/MarginTypeImages/IsolatedWalletIcon.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MarginTypeWarning from "./MarginTypeWarning";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
const MIsolatedToCrossWallet = ({ marginType, symbol = "BTCUSDT", IsOpen, close }: { marginType: string; symbol: string; IsOpen: boolean; close: () => void }) => {
  const [marginTypeValue, setMarginTypeValue] = useState("ISOLATED");
  const dispatch = useDispatch();
  const [expandIsolatedContent, setExpandIsolatedContent] = useState(false);
  const [expandCrossContent, setExpandCrossContent] = useState(false);
  const allPositionsData = useSelector((state: any) => state.currentPositions.currentPositions);
  const [renderType, setRenderType] = useState("");
  const openOrdersData = useSelector((state: any) => state.futures.openOrders);

  const getPositionAndOrderIndex = () => {
    // check positions array and open orders array for symbol
    const positionIndex = allPositionsData.findIndex((activePosition: { sym: string }) => activePosition.sym === symbol.toUpperCase());
    const openOrderIndex = openOrdersData.findIndex((activeOrder: { symbol: string }) => activeOrder.symbol === symbol.toUpperCase());

    return { positionIndex, openOrderIndex };
  };

  useEffect(() => {
    const tradeIndexes = getPositionAndOrderIndex();
    // if symbol present in indexes -> show Warning
    if (tradeIndexes.positionIndex === -1 && tradeIndexes.openOrderIndex === -1) {
      setRenderType("ChooseMarginTypeModal");
    } else {
      setRenderType("MarginTypeWarningModal");
    }

    if (marginType === "CROSS") {
      setMarginTypeValue("CROSS");
    }
  }, [marginType]);

  const callBack = (symbol: string, marginType: string) => {
    dispatch({
      type: SET_MARGIN_TYPE,
      payload: {
        sym: symbol,
        marginType: marginType.toUpperCase()
      }
    });
  };

  const handleModalPrimaryAction = () => {
    if (renderType === "ChooseMarginTypeModal") {
      dispatch(
        SETMARGINTYE(
          {
            marginType: marginTypeValue,
            symbol: symbol.toUpperCase()
          },
          callBack
        )
      );
    }
    close();
  };

  const handleIsolatedToggleExpansion = (event: { stopPropagation: () => void }) => {
    setExpandIsolatedContent(!expandIsolatedContent);
    setExpandCrossContent(false);
    event.stopPropagation();
  };

  const handleCrossToggleExpansion = (event: { stopPropagation: () => void }) => {
    setExpandCrossContent(!expandCrossContent);
    setExpandIsolatedContent(false);
    event.stopPropagation();
  };

  const ChooseMarginType = () => {
    return (
      <Drawer
        onClose={close}
        open={IsOpen}
        BackdropProps={{
          sx: { backgroundColor: "transparent" } // Change the backdrop color
        }}
        primaryName={"Confirm"}
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            backgroundColor: "#1F1F24",
            backgroundImage: "none",
            overflowY: "hidden",
            p: "24px"
          }
        }}
        anchor="bottom"
        hideBackdrop={false}
      >
        <Box sx={{ pt: 0.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography component={"p"} variant="SemiBold_18">
              {"Margin Mode: "}
            </Typography>
            <Typography id="symbole-Modal" color={"text.mild"} variant="Medium_18" component={"p"}>
              &nbsp;{symbol.toUpperCase()}
            </Typography>
          </Box>
          <Grid container justifyContent={"space-between"} spacing={2} my={2}>
            <Grid id="cross-Grid" item xs={12}>
              <Card
                id="Cross-Card"
                sx={{
                  backgroundColor: "background.secondary",
                  border: marginTypeValue === "CROSS" ? "1px solid #E2FF6F" : "none",
                  cursor: "pointer"
                }}
                onClick={() => setMarginTypeValue("CROSS")}
              >
                <CardContent
                  id="card-Content"
                  sx={{
                    px: "20px",
                    py: "16px",
                    ":last-child": { py: "16px", px: "20px" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Box id="Cross" sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Box component={"img"} src={CrossWalletIcon} sx={{ fontSize: "20px" }} />
                    <Box>
                      <Typography id="crosstext" variant="SemiBold_16" component={"p"}>
                        {"CROSS"}
                      </Typography>
                      <Typography variant="Regular_12" color="text.mild" component={"p"}>
                        {"Shared Margin"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box onClick={handleCrossToggleExpansion}>
                    {expandCrossContent ? (
                      <Box
                        sx={{
                          color: "text.mild",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <Typography variant="Regular_12">COLLAPSE</Typography>
                        <ExpandLessIcon fontSize="12px" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          color: "text.mild",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <Typography variant="Regular_12">LEARN MORE</Typography>
                        <ExpandMoreIcon fontSize="12px" />
                      </Box>
                    )}
                  </Box>
                </CardContent>
                <Collapse in={expandCrossContent} unmountOnExit>
                  <CardContent sx={{ ":last-child": { pt: "0px", px: "20px" } }}>
                    <Box
                      sx={{
                        borderBlock: "0.8px solid #5C5C5C",
                        py: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                        <Typography variant="Regular_11" component={"p"}>
                          Reduce chances of liquidation
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                        <Typography variant="Regular_11" component={"p"}>
                          Manage ill-effects of highly volatile market
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
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
            <Grid item xs={12}>
              <Card
                sx={{
                  backgroundColor: "background.secondary",
                  border: marginTypeValue === "ISOLATED" ? "1px solid #E2FF6F" : "none",
                  cursor: "pointer"
                }}
                onClick={() => setMarginTypeValue("ISOLATED")}
              >
                <CardContent
                  sx={{
                    px: "20px",
                    py: "16px",
                    ":last-child": { py: "16px", px: "20px" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Box component={"img"} src={IsolatedWalletIcon} sx={{ fontSize: "20px" }} />
                    <Box>
                      <Typography variant="SemiBold_16" component={"p"}>
                        {"ISOLATED"}
                      </Typography>
                      <Typography variant="Regular_12" color="text.mild" component={"p"}>
                        {"Individual Margin"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box onClick={handleIsolatedToggleExpansion}>
                    {expandIsolatedContent ? (
                      <Box
                        sx={{
                          color: "text.mild",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <Typography variant="Regular_12">COLLAPSE</Typography>
                        <ExpandLessIcon fontSize="12px" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          color: "text.mild",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}
                      >
                        <Typography variant="Regular_12">LEARN MORE</Typography>
                        <ExpandMoreIcon fontSize="12px" />
                      </Box>
                    )}
                  </Box>
                </CardContent>
                <Collapse in={expandIsolatedContent} timeout="auto" unmountOnExit>
                  <CardContent sx={{ ":last-child": { pt: "0px", px: "20px" } }}>
                    <Box
                      sx={{
                        borderBlock: "0.8px solid #5C5C5C",
                        py: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                        <Typography variant="Regular_11" component={"p"}>
                          Preferred for amateur traders
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                        <Typography variant="Regular_11" component={"p"}>
                          Each position is allocated separate wallet
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "9px",
                          alignItems: "center"
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: "14px", color: "#ADADAD" }} />
                        <Typography variant="Regular_11" component={"p"}>
                          No spillover of Liquidation and Risk of one position to other
                        </Typography>
                      </Box>
                    </Box>
                    <Box color="text.mild" sx={{ pt: "16px" }}>
                      <Typography component={"p"} variant="Regular_10">
                        <Typography color="#ECA233" variant="Regular_10" component={"span"}>
                          WARNING &nbsp;
                        </Typography>
                        In case of high volatility, there is a high risk of liquidation if risk is not managed properly
                      </Typography>
                    </Box>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="Regular_12" component={"p"} color="white">
                {"NOTE"}&nbsp;
              </Typography>
              <Typography variant="Regular_11" component={"p"} color="text.mild">
                Switching the margin mode will only apply it to the selected contract. The margin mode cannot be changed while you have an open order/position.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomButton variant="primary" isDisabled={marginTypeValue === marginType} label={"Confirm"} fullWidth onClick={handleModalPrimaryAction} />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    );
  };
  return (
    <>
      {renderType === "ChooseMarginTypeModal" && <ChooseMarginType />}
      {renderType === "MarginTypeWarningModal" && (
        <CustomModal isClose={true} close={close} IsOpen={IsOpen} primaryName={"Ok"} isPrimaryAction={true} primaryAction={handleModalPrimaryAction}>
          <MarginTypeWarning isMobile={true} symbol={symbol} />
        </CustomModal>
      )}
    </>
  );
};
MIsolatedToCrossWallet.propTypes = {
  IsOpen: PropTypes.bool,
  marginType: PropTypes.string,
  close: PropTypes.func,
  primaryName: PropTypes.string,
  primaryAction: PropTypes.func,
  isClose: PropTypes.bool,
  isPrimaryAction: PropTypes.bool,
  symbol: PropTypes.string,
  setMarginType: PropTypes.string
};
export default MIsolatedToCrossWallet;
