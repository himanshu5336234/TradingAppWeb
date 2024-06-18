import React, { useState, useEffect, useRef } from "react";
import { Modal, Container, Box, Grid, Typography, ToggleButtonGroup, ToggleButton, Slider, InputAdornment, TabProps, Tab, Tabs, ClickAwayListener, Popper, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getCurrencyUrl } from "@/helpers/CurrencyLogo";

import { SYMBOLDROPDOWNWRAPPER, SYMBOLICONWRAPPER, ICONWRAPPER, CLOSEBUTTONWRAPPER } from "./OrderFormCalculatorStyle";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Search from "./Search.svg";

import { _24hrTicker, getFuturesAccountDetailsApi } from "@/frontend-api-service/Api";
import { getMarkPrice } from "@/frontend-api-service/Api/SnapShot";
import { BUTTONWRAPPERCENTRE, CONTIANER } from "@/components/CustomModals/newModal/Style";
import { SPACE_BETWEEN } from "@/pages/UserVerification/styles";
import TextView from "@/components/UI/TextView/TextView";
import BasicTextFields from "@/components/UI/CustomInput/BasicTextFields";
import CustomDivider from "@/components/UI/Divider/CustomDivider";
import CustomButton from "@/components/UI/CustomButton/CustomButton";

interface CalculatorProps {
  isCalculatorOpen: Boolean;
  setIsCalculatorOpen: (val: Boolean) => void;
}

const OrderFormCalculatorModal: React.FC<CalculatorProps> = ({ isCalculatorOpen, setIsCalculatorOpen }) => {
  const selectedSymbolFromTradeScreen = useSelector((state: any) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  const tradeableSymbols = useSelector((state: any) => state.tradablesymbolList.tradablesymbolList);
  const leverageBracket = useSelector((state: any) => state.leverageBracket.leverageBracket);
  const showValuesInCalculator = useRef(true);

  const [selectedSymbolFromCalculator, setSelectedSymbolFromCalculator] = useState(selectedSymbolFromTradeScreen?.toUpperCase() || "BTCUSDT");
  const [buySellToggle, setBuySellToggle] = useState("BUY");
  const [isolatedCrossToggle, setIsolatedCrossToggle] = useState("ISOLATED");
  const [entryPrice, setEntryPrice] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [exitPrice, setExitPrice] = useState(0);
  const [contractSize, setContractSize] = useState(0);
  const [tabValue, setTabValue] = useState("pnl");
  const [makerTakerToggle, setMakerTakerToggle] = useState("as_Maker");
  const [walletBalanceUsed, setWalletBalanceUsed] = useState(0);
  const [grosspnl, setGrosspnl] = useState(0);
  const [netpnl, setNetpnl] = useState(0);
  const [roe, setRoe] = useState(0);
  const [commission, setCommission] = useState(0);
  const [fundingRate, setFundingRate] = useState("");
  const [liquidationPrice, setLiquidationPrice] = useState(0);
  const [breakevenPrice, setBreakevenprice] = useState(0);
  const [maxLeverage, setMaxLeverage] = useState(1);
  const [maxNotional, setMaxNotional] = useState(0);
  const [anchorEl, setAnchorEl] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [searchSymbol, setSearchSymbol] = useState("");

  const [entryPriceError, setEntryPriceError] = useState("");
  const [exitPriceError, setExitPriceError] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [walletBalanceUsedError, setWalletBalanceUsedError] = useState("");
  const [isCalculationsExpanded, setIsCalculationExpanded] = useState(false);
  const intervalIDForFunding = useRef(0);
  const [walletBalanceUsedAfterLeverage, setWalletBalanceUsedAfterLeverage] = useState(0);
  const [leverageError, setLeverageError] = useState("");

  const sideMultiplier = () => (buySellToggle === "BUY" ? 1 : -1);
  const commissionMultiplier = () => (makerTakerToggle === "as_Maker" ? 0.02 / 100 : 0.05 / 100);

  function toFixedDown(number: number, digits: number) {
    const re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
      m = number.toString().match(re);
    return m ? parseFloat(m[1]) : number.valueOf();
  }

  const handleQuantityPrecision = (value: any) => {
    const precisionDirectory = tradeableSymbols.filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0];
    setContractSize(toFixedDown(value, precisionDirectory.quantityPrecision));
  };

  const handlePricePrecisionForEntryPrice = (value: any) => {
    const precisionDirectory = tradeableSymbols.filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0];
    setEntryPrice(toFixedDown(value, precisionDirectory.pricePrecision));
  };

  const handlePricePrecisionForExitPrice = (value: any) => {
    const precisionDirectory = tradeableSymbols.filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0];
    setExitPrice(toFixedDown(value, precisionDirectory.pricePrecision));
  };

  const handleMinClickForQuantity = () => {
    const minimumNotion = tradeableSymbols
      .filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0]
      .filters.filter((filter: any) => filter.filterType === "MIN_NOTIONAL")[0]?.notional;
    const quantityPrecision = tradeableSymbols.filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0].quantityPrecision;
    setContractSize(Math.ceil((Number(minimumNotion) / entryPrice) * Math.pow(10, quantityPrecision)) / Math.pow(10, quantityPrecision));
  };

  const calculatePnl = () => {
    if (!leverage) {
      setLeverageError("Please enter a valid leverage");
      return;
    }
    if (leverage > maxLeverage) {
      setLeverageError(`Leverage cannot be greater then ${maxLeverage}`);
      return;
    }
    if (!contractSize) {
      setSizeError("Size cannot be empty");
      return;
    }
    if (!entryPrice) {
      setEntryPriceError("Entry Price cannot be empty");
      return;
    }
    if (!exitPrice) {
      setExitPriceError("Size field cannot be empty");
      return;
    }
    if (!walletBalanceUsed && isolatedCrossToggle === "CROSS") {
      setWalletBalanceUsedError("Wallet balance cannot be empty");
      return;
    }
    if (contractSize * entryPrice > maxNotional) {
      setSizeError("Exceeds maximum contract size for the given leverage");
      return;
    }
    if (isolatedCrossToggle === "CROSS" && (Number(entryPrice) * Number(contractSize)) / leverage > Number(walletBalanceUsed)) {
      setWalletBalanceUsedError("Insufficient balance. Please reduce the size");
      return;
    }

    showValuesInCalculator.current = false;
    const commissionOnEntryExit = Number(contractSize * (Number(exitPrice) + Number(entryPrice)) * commissionMultiplier()).toFixed(4);
    const grossPnLOnExit = Number(sideMultiplier() * (exitPrice - entryPrice) * contractSize).toFixed(4);
    const marginBalanceUsed = Number(Number((entryPrice * contractSize) / leverage).toFixed(4));

    const netPnlAfterPrecision = Number(Number(Number(grossPnLOnExit) - Number(commissionOnEntryExit)).toFixed(4));
    setCommission(Number(commissionOnEntryExit));
    setWalletBalanceUsedAfterLeverage(marginBalanceUsed);
    setGrosspnl(Number(grossPnLOnExit));
    setNetpnl(netPnlAfterPrecision);

    const liquidationPriceDirectory = calculateMaintenanceMargin();

    const alpha = (isolatedCrossToggle === "ISOLATED" ? Number(marginBalanceUsed) : Number(walletBalanceUsed)) + liquidationPriceDirectory?.cum - sideMultiplier() * contractSize * entryPrice;
    const beta = contractSize * (liquidationPriceDirectory?.mmr - sideMultiplier());

    const breakevenPriceBeforePrecision = Number(Number((entryPrice * (sideMultiplier() + commissionMultiplier())) / (sideMultiplier() - commissionMultiplier())));
    const liquidationPriceBeforePrecision = Number(Number(alpha / beta > 0 ? alpha / beta : 0));
    setLiquidationPrice(handlePricePrecision(liquidationPriceBeforePrecision));
    setRoe(Number(((netPnlAfterPrecision * 100) / (isolatedCrossToggle === "ISOLATED" ? Number(marginBalanceUsed) : Number(walletBalanceUsed))).toFixed(2)));
    setBreakevenprice(handlePricePrecision(breakevenPriceBeforePrecision));
  };

  useEffect(() => {
    setEntryPriceError("");
    setExitPriceError("");
    setWalletBalanceUsedError("");
    setSizeError("");
  }, [entryPrice, exitPrice, leverage, contractSize, walletBalanceUsed, selectedSymbolFromCalculator, isolatedCrossToggle, buySellToggle]);

  const calculateMaintenanceMargin = () => {
    const leverageData = leverageBracket.filter((leverageEntry: { symbol: string }) => leverageEntry?.symbol === selectedSymbolFromCalculator)[0].leverageBrackets?.brackets;
    for (let i = 0; i < leverageData.length; i++) {
      if (contractSize >= leverageData[i].notionalFloor && contractSize <= leverageData[i].notionalCap) {
        return {
          maintainanceMargin: contractSize * leverageData[i].maintMarginRatio - leverageData[i].cum,
          mmr: leverageData[i].maintMarginRatio,
          cum: leverageData[i].cum
        };
      }
    }
  };

  useEffect(() => {
    setContractSize(0);
    if (intervalIDForFunding.current) clearInterval(intervalIDForFunding.current);
    getMarkPrice(selectedSymbolFromCalculator).then((markPriceDetails: any) => {
      const fundingRateFromServer = Number(markPriceDetails.data.lastFundingRate * 100).toFixed(5);
      let untilNextFundingTime = markPriceDetails.data.nextFundingTime - Date.now();
      intervalIDForFunding.current = window.setInterval(() => {
        let seconds = String(Math.floor(untilNextFundingTime / 1000));
        let minutes = String(Math.floor(Number(seconds) / 60));
        let hours = String(Math.floor(Number(minutes) / 60));
        seconds = String(Number(seconds) % 60);
        minutes = String(Number(minutes) % 60);
        if (seconds.length < 2) seconds = "0" + seconds;
        if (minutes.length < 2) minutes = "0" + minutes;
        if (hours.length < 2) hours = "0" + hours;
        setFundingRate(`${fundingRateFromServer}% / ${hours}:${minutes}:${seconds}`);
        untilNextFundingTime -= 1000;
      }, 1000);
    });
  }, [selectedSymbolFromCalculator]);

  useEffect(() => {
    getFuturesAccountDetailsApi().then((details: any) => {
      setWalletBalanceUsed(Number(Number(details.data.totalWalletBalance).toFixed(2)));
    });
    if (leverageBracket.length > 0) {
      setMaxLeverage(leverageBracket.filter((symbol: any) => symbol?.symbol === selectedSymbolFromCalculator)[0].leverageBrackets.brackets[0]?.initialLeverage);
    }
  }, [selectedSymbolFromCalculator, leverageBracket]);

  useEffect(() => {
    if (leverageBracket.length) {
      setMaxNotional(
        leverageBracket.filter((symbol: any) => symbol.symbol === selectedSymbolFromCalculator)[0].leverageBrackets.brackets.filter((filter: any) => filter.initialLeverage === Number(leverage))[0]
          ?.notionalCap
      );
    }
  }, [selectedSymbolFromCalculator, leverageBracket, leverage]);

  useEffect(() => {
    _24hrTicker(selectedSymbolFromCalculator).then((ticker: any) => {
      setEntryPrice(ticker.data.lastPrice);
      setExitPrice(ticker.data.lastPrice);
    });
  }, [selectedSymbolFromCalculator]);

  const handleLastEntryPrice = () => {
    _24hrTicker(selectedSymbolFromCalculator).then((ticker: any) => {
      setEntryPrice(ticker.data.lastPrice);
    });
  };

  const handleLastExitPrice = () => {
    _24hrTicker(selectedSymbolFromCalculator).then((ticker: any) => {
      setExitPrice(ticker.data.lastPrice);
    });
  };

  const symbolLogo = () => getCurrencyUrl(selectedSymbolFromCalculator.replace("USDT", "").toLowerCase());
  const symbolLogoFromDropdown = (symbol: string) => getCurrencyUrl(symbol.replace("USDT", "").toLowerCase());

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius
      }
    }
  }));

  const TabPrimary = styled(Tab)<TabProps>(() => ({
    textTransform: "none",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Neurial-Medium",
    fontSize: "12px",
    "&:not(Mui-selected)": {
      color: "text.regular"
    },
    "&.Mui-selected": {
      color: "white"
    }
  }));

  const onCalculatorClose = () => {
    setIsCalculatorOpen(false);
  };

  const fundingFeeBuySellMultiplier = () => sideMultiplier() * Number(fundingRate?.split("%")[0]) > 0;

  const calculatorTabs = [
    {
      label: "P&L",
      value: "pnl"
    },
    {
      label: "Fees",
      value: "fees"
    },
    {
      label: "Liquidation Price",
      value: "liquidation"
    }
  ];

  function renderTabContent() {
    switch (tabValue) {
      case "pnl":
        return (
          <Box>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"Wallet Balance Used"} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : walletBalanceUsedAfterLeverage + " USDT "} variant={"Bold_12"} />
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"Gross P&L"} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : grosspnl + " USDT "} variant={"Bold_12"} />
              </Grid>
            </Grid>
            <CustomDivider alignment="" />
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem", marginTop: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"Net P&L " + `(as ${makerTakerToggle.split("_")[1]})`} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : netpnl + " USDT "} variant={"Bold_12"} />
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"ROE"} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : roe + " % "} variant={"Bold_12"} />
              </Grid>
            </Grid>
          </Box>
        );
      case "fees":
        return (
          <Box>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "center" }}>
              <Grid item container xs={8}>
                <Grid item>
                  <TextView text={"Commission " + `(as ${makerTakerToggle.split("_")[1]})`} variant={"Medium_12"} color={"text.regular"} />
                </Grid>
                <Grid item onClick={() => setIsCalculationExpanded(!isCalculationsExpanded)} sx={{ cursor: "pointer" }}>
                  {isCalculationsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : commission + " USDT "} variant={"Bold_12"} />
              </Grid>
            </Grid>
            {isCalculationsExpanded && (
              <Box>
                <Box>
                  <TextView text={"CALCULATION"} variant={"Medium_12"} color={"text.regular"} />
                </Box>
                <Box>
                  <TextView text={"Commission Rate x size x (entry price + exit price)"} variant={"Medium_12"} color={"text.regular"} />
                </Box>
                <Box sx={{ marginBottom: "0.75rem" }}>
                  <TextView
                    text={showValuesInCalculator.current ? "--" : `${commissionMultiplier()} X ${contractSize} X (${entryPrice} + ${exitPrice})`}
                    color={"text.quaternary"}
                    variant={"Medium_12"}
                  />
                </Box>
              </Box>
            )}
            <CustomDivider alignment="" />
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem", marginTop: "0.75rem" }}>
              <Grid item xs={7}>
                <TextView text={"Funding Rate:"} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={5}>
                <TextView text={showValuesInCalculator.current ? "--" : fundingRate} variant={"Bold_12"} color={"text.regular"} />
              </Grid>
            </Grid>
            <TextView
              text={
                showValuesInCalculator.current
                  ? "--"
                  : `${Math.abs(Number(Number(Number(fundingRate?.split("%")[0]) * entryPrice * contractSize * 0.01 * sideMultiplier()).toFixed(4)))} USDT will be ${
                      fundingFeeBuySellMultiplier() ? "deducted" : "credited"
                    } in ${fundingRate?.split("/")[1]} hrs`
              }
              variant={"Bold_12"}
            />
          </Box>
        );
      case "liquidation":
        return (
          <Box>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"Liquidation Price"} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : liquidationPrice ? liquidationPrice + " USDT " : "--"} variant={"Bold_12"} />
              </Grid>
            </Grid>
            <Grid container sx={{ justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <Grid item xs={8}>
                <TextView text={"Breakeven Price " + `(as ${makerTakerToggle.split("_")[1]})`} variant={"Medium_12"} color={"text.regular"} />
              </Grid>
              <Grid item xs={4}>
                <TextView text={showValuesInCalculator.current ? "--" : breakevenPrice + " USDT "} variant={"Bold_12"} />
              </Grid>
            </Grid>
          </Box>
        );
    }
  }

  return (
    <Modal open={isCalculatorOpen} onClose={onCalculatorClose}>
      <Container sx={{ ...CONTIANER, maxWidth: { sm: "725px", xs: "350px" } }}>
        <Box sx={SPACE_BETWEEN}>
          <Box
            onClick={() => {
              setIsCalculatorOpen(false);
              setDropdown(false);
            }}
            sx={CLOSEBUTTONWRAPPER}
          >
            <Typography sx={{ m: " auto" }}>&#x2715;</Typography>
          </Box>
        </Box>
        <Grid container>
          <Grid xs={6}>
            <Box sx={{ backgroundColor: "background.secondary", p: "1rem" }}>
              <Box
                sx={SYMBOLDROPDOWNWRAPPER}
                onClick={(event: any) => {
                  setAnchorEl(event.target);
                  setDropdown(!dropdown);
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={SYMBOLICONWRAPPER}>
                    <Box component={"img"} src={symbolLogo()} sx={ICONWRAPPER} />
                  </Box>
                  <Box>
                    <TextView component={"p"} variant="bold_16">
                      {selectedSymbolFromCalculator}
                    </TextView>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <ExpandMoreIcon />
                </Box>
              </Box>
              {dropdown && (
                <ClickAwayListener onClickAway={() => setDropdown(false)}>
                  <Popper sx={{ zIndex: "100000" }} anchorEl={anchorEl} open={dropdown}>
                    <Box p={"0.625rem 0.625rem 0.625rem 0.625rem"} sx={{ backgroundColor: "background.secondary", height: "20rem", overflow: "scroll" }}>
                      <BasicTextFields
                        value={searchSymbol}
                        onChange={(event: any) => setSearchSymbol(event.target.value)}
                        placeholder={"Search Symbol"}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <>
                                <img src={Search} style={{ height: "20px", width: "20px" }} />
                              </>
                            </InputAdornment>
                          )
                        }}
                      />
                      {tradeableSymbols
                        ?.filter((symbol: any) => symbol.symbol.includes(searchSymbol?.toUpperCase()) || !searchSymbol)
                        ?.map((symbol: any) => (
                          <MenuItem
                            key={symbol.symbol}
                            onClick={() => {
                              setSelectedSymbolFromCalculator(symbol.symbol);
                              setDropdown(false);
                            }}
                            value={symbol.symbol}
                            sx={{ width: "200px", cursor: "pointer" }}
                          >
                            <Box component={"img"} src={symbolLogoFromDropdown(symbol.symbol)} sx={{ ...ICONWRAPPER, height: "18px", width: "18px", marginRight: "0.5rem" }} />
                            <Box>
                              <TextView text={symbol.symbol} variant={"Bold_14"} />
                            </Box>
                          </MenuItem>
                        ))}
                    </Box>
                  </Popper>
                </ClickAwayListener>
              )}
              <Grid container sx={{ marginTop: "1rem", justifyContent: "space-between" }}>
                <Grid item xs={3}>
                  <StyledToggleButtonGroup
                    size="small"
                    exclusive
                    onChange={(e: any) => {
                      setBuySellToggle(e?.target?.value);
                    }}
                    value={buySellToggle}
                    sx={{
                      width: "108px",
                      height: "32px",
                      marginRight: "0.6rem",
                      backgroundColor: "background.default"
                    }}
                  >
                    <ToggleButton
                      value="BUY"
                      sx={{
                        width: "50%",
                        border: " 1px solid rgb(255 255 255 / 8%);",
                        "&.Mui-selected": {
                          color: "#fff",
                          background: "linear-gradient(173.87deg, #29B57E -234.51%, rgba(41, 181, 126, 0) 253.9%) !important",
                          "&:hover": { color: "#fff", backgroundColor: "#219165;" }
                        },
                        "&:hover": { backgroundColor: "rgb(255 255 255 / 8%);" }
                      }}
                    >
                      {"BUY"}
                    </ToggleButton>
                    <ToggleButton
                      value="SELL"
                      sx={{
                        width: "50%",
                        border: " 1px solid rgb(255 255 255 / 8%);",
                        "&.Mui-selected": {
                          color: "#fff",
                          background: "linear-gradient(173.87deg, #FF6554 -234.51%, rgba(255, 101, 84, 0) 253.9%) !important",
                          "&:hover": { color: "#fff", backgroundColor: "#c34c4c" }
                        },
                        "&:hover": { backgroundColor: "#rgb(255 255 255 / 8%);" }
                      }}
                    >
                      {"SELL"}
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Grid>
                <Grid item xs={8}>
                  <StyledToggleButtonGroup
                    size="small"
                    exclusive
                    onChange={(e: any) => {
                      setIsolatedCrossToggle(e?.target?.value);
                    }}
                    value={isolatedCrossToggle}
                    sx={{
                      width: "209px",
                      height: "32px",
                      backgroundColor: "background.default",
                      marginLeft: "0.25rem"
                    }}
                    aria-label="text alignment"
                  >
                    <ToggleButton
                      value="ISOLATED"
                      sx={{
                        width: "50%",
                        border: " 1px solid rgb(255 255 255 / 8%);",
                        "&.Mui-selected": {
                          color: "#fff",
                          backgroundColor: "#383840"
                        },
                        "&:hover": { backgroundColor: "rgb(255 255 255 / 8%);" }
                      }}
                    >
                      {"ISOLATED"}
                    </ToggleButton>
                    <ToggleButton
                      value="CROSS"
                      sx={{
                        width: "50%",
                        border: " 1px solid rgb(255 255 255 / 8%);",
                        "&.Mui-selected": {
                          color: "#fff",
                          backgroundColor: "#383840"
                        },
                        "&:hover": { backgroundColor: "#rgb(255 255 255 / 8%);" }
                      }}
                    >
                      {"CROSS"}
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: "space-between", marginTop: "1rem", marginLeft: "1rem" }}>
                <Grid item xs={8}>
                  <Slider
                    min={1}
                    sx={{
                      color: "#C0DF5A",
                      height: "6px",
                      borderRadius: "40px",
                      "& .MuiSlider-thumb": {
                        width: 21,
                        height: 21,
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),conic-gradient(from 135deg at 50% 50%, #16B943 0deg, #EBFF25 193.12deg, #16B943 360deg)",
                        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": {
                          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)"
                        }
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "background.tertiary"
                      }
                    }}
                    max={maxLeverage}
                    size="small"
                    valueLabelDisplay="auto"
                    value={leverage}
                    onChange={(e: any) => {
                      setLeverage(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ marginRight: "1rem" }}>
                  <BasicTextFields
                    inputProps={{ style: { textAlign: "center" } }}
                    value={leverage + "x"}
                    styles={{ textAlign: "center" }}
                    onChange={(event: any) => {
                      setLeverage(event.target.value.split("x")[0]);
                    }}
                  />
                </Grid>
              </Grid>
              {leverageError.length > 0 && (
                <Typography color={"text.error"} variant={"Medium_12"}>
                  {leverageError}
                </Typography>
              )}
              <Box sx={{ marginTop: "1rem" }}>
                <TextView text={"Max notional size allowed: " + maxNotional + " USDT"} variant="Bold_12" />
              </Box>
              <Box sx={{ marginTop: "1rem", height: "275px" }}>
                <BasicTextFields
                  Error={Boolean(entryPriceError)}
                  errorText={entryPriceError}
                  value={entryPrice}
                  type="number"
                  placeholder={"0.00"}
                  onChange={(e) => handlePricePrecisionForEntryPrice(e.target.value)}
                  label={"Entry Price"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <>
                          <TextView onClick={handleLastEntryPrice} component="p" variant="Bold_12" style={{ cursor: "pointer" }}>
                            Last
                          </TextView>
                        </>
                      </InputAdornment>
                    )
                  }}
                />
                <Box sx={{ marginTop: "0.5rem" }}>
                  <BasicTextFields
                    Error={Boolean(exitPriceError)}
                    errorText={exitPriceError}
                    value={exitPrice}
                    type="number"
                    placeholder={"0.00"}
                    onChange={(e) => handlePricePrecisionForExitPrice(e.target.value)}
                    label={"Exit Price"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <>
                            <TextView onClick={handleLastExitPrice} component="p" variant="Bold_12" style={{ cursor: "pointer" }}>
                              Last
                            </TextView>
                          </>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <BasicTextFields
                    Error={Boolean(sizeError)}
                    errorText={sizeError}
                    value={contractSize}
                    type="number"
                    placeholder={"0.00"}
                    onChange={(e) => handleQuantityPrecision(e.target.value)}
                    label={`Size In Contract (${selectedSymbolFromCalculator?.split("USDT")[0]})`}
                    InputProps={{
                      endAdornment: (
                        <>
                          <InputAdornment position="end">
                            <>
                              <TextView onClick={handleMinClickForQuantity} component="p" variant="Bold_12" style={{ cursor: "pointer" }}>
                                Min
                              </TextView>
                            </>
                          </InputAdornment>
                        </>
                      )
                    }}
                  />
                </Box>
                {isolatedCrossToggle === "CROSS" && (
                  <>
                    <Box sx={{ marginTop: "0.5rem" }}>
                      <BasicTextFields
                        Error={Boolean(walletBalanceUsedError)}
                        errorText={walletBalanceUsedError}
                        value={walletBalanceUsed}
                        type="number"
                        placeholder={"0.00"}
                        onChange={(e) => setWalletBalanceUsed(e.target.value)}
                        label={"Wallet Balance In USDT"}
                      />
                    </Box>
                    <TextView text={"Note: Does not account for potential impact of other open positions."} variant={"Medium_10"} color={"text.regular"} />
                  </>
                )}
              </Box>
              <Box maxWidth="md" sx={BUTTONWRAPPERCENTRE}>
                <CustomButton
                  isDisabled={Boolean(sizeError) || Boolean(entryPriceError) || Boolean(exitPriceError) || Boolean(walletBalanceUsedError)}
                  id={"primary-btn"}
                  variant={"primary"}
                  onClick={calculatePnl}
                  label={"Calculate"}
                />
              </Box>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={{ backgroundColor: "primary", p: "1.5rem" }}>
              <Box sx={{ height: "375px" }}>
                <Box
                  sx={{
                    marginBottom: "1.5rem",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "background.secondary"
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={(_, value) => {
                      setTabValue(value);
                    }}
                  >
                    {calculatorTabs.map((data, index) => (
                      <TabPrimary label={data.label} key={index} value={data.value} />
                    ))}
                  </Tabs>
                </Box>
                <Grid container sx={{ justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <Grid item xs={6}>
                    <TextView text={"RESULTS"} variant={"Medium_12"} color={"text.regular"} />
                  </Grid>
                  <Grid item xs={6}>
                    <StyledToggleButtonGroup
                      size="small"
                      exclusive
                      onChange={(e: any) => {
                        setMakerTakerToggle(e?.target?.value);
                      }}
                      value={makerTakerToggle}
                      sx={{
                        width: "150px",
                        height: "24px",
                        backgroundColor: "background.default"
                      }}
                      aria-label="text alignment"
                    >
                      <ToggleButton
                        value="as_Maker"
                        sx={{
                          width: "50%",
                          border: " 1px solid rgb(255 255 255 / 8%);",
                          "&.Mui-selected": {
                            color: "#fff",
                            backgroundColor: "#383840"
                          },
                          padding: "0.25rem",
                          "&:hover": { backgroundColor: "rgb(255 255 255 / 8%);" }
                        }}
                      >
                        {"as Maker"}
                      </ToggleButton>
                      <ToggleButton
                        value="as_Taker"
                        sx={{
                          width: "50%",
                          border: " 1px solid rgb(255 255 255 / 8%);",
                          "&.Mui-selected": {
                            color: "#fff",
                            backgroundColor: "#383840"
                          },
                          padding: "0.25rem",
                          "&:hover": { backgroundColor: "#rgb(255 255 255 / 8%);" }
                        }}
                      >
                        {"as Taker"}
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                  </Grid>
                </Grid>
                {renderTabContent()}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  height: "200px"
                }}
              >
                <Box
                  p={"0.5rem 1rem 0.5rem 1rem"}
                  sx={{
                    background: "linear-gradient(185deg, rgba(226, 255, 111, 0.12) -53.88%, rgba(54, 208, 104, 0.00) 165.2%);",
                    borderRadius: "4px",
                    border: "0.2px solid #667d00"
                  }}
                >
                  <Grid container>
                    <Grid item>
                      <TextView variant={"Regular_12"} text={"Commission:"} color={"text.quaternary"} />
                    </Grid>
                    <Grid item sx={{ marginLeft: "1rem" }}>
                      <TextView variant={"Regular_12"} text={"Maker:"} color={"text.quaternary"} />
                    </Grid>
                    <Grid item sx={{ marginLeft: "0.25rem" }}>
                      <TextView variant={"SemiBold_12"} text={"0.02%"} />
                    </Grid>
                    <Grid item sx={{ marginLeft: "0.25rem", marginRight: "0.25rem" }}>
                      <TextView variant={"Regular_12"} text={"|"} color={"text.quaternary"} />
                    </Grid>
                    <Grid item>
                      <TextView variant={"Regular_12"} text={"Taker:"} />
                    </Grid>
                    <Grid item sx={{ marginLeft: "0.25rem" }}>
                      <TextView variant={"SemiBold_12"} text={"0.05%"} />
                    </Grid>
                  </Grid>
                  <Box sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    <CustomDivider alignment="" />
                  </Box>
                  <Box>
                    <Grid container>
                      <Grid item>
                        <TextView variant={"SemiBold_12"} text={"Maker:"} />
                      </Grid>
                      <Grid item sx={{ marginLeft: "0.25rem" }}>
                        <TextView variant={"Regular_12"} text={"delayed execution, generally limit order"} color={"text.quaternary"} />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <TextView variant={"SemiBold_12"} text={"Taker:"} />
                      </Grid>
                      <Grid item sx={{ marginLeft: "0.25rem" }}>
                        <TextView variant={"Regular_12"} text={"instant execution, generally market order"} color={"text.quaternary"} />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default OrderFormCalculatorModal;
