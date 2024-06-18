/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import "./MarginRatio.css";

import { Select } from "../UI/Select";
import { useSelector } from "react-redux";

let localPositionsBook = {};

function MarginRatio() {
  const [fetchedprogressStatus, setFetchedProgressStatus] = useState("");
  const [progressStatus1, setProgressStatus1] = useState("");
  const [progressStatus2, setProgressStatus2] = useState("");
  const [progressStatus3, setProgressStatus3] = useState("");
  const [progressStatus4, setProgressStatus4] = useState("");

  const positionsFromState = useSelector((state) => state.currentPositions.currentPositions);
  const selectedSymbol = useSelector((state) => state.selectSymbol && state.selectSymbol.selectedSymbol);
  const [positionsDropdownValues, setPositionsDropdownValues] = useState([]);
  const [activePositionObject, setActivePositionObject] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [emptyPositionsText, setEmptyPositionsText] = useState("");
  const [selectedSymbolPresentInPositions, setSelectedSymbolPresentInPositions] = useState(true);

  const getSymbolList = useSelector((state) => state.tradablesymbolList.tradablesymbolList);
  let settlementCurrencyType = "";
  if (getSymbolList.length && selectedSymbol.length) {
    const selectedContract = getSymbolList.filter((contract) => contract.symbol.toLowerCase() === selectedSymbol);
    settlementCurrencyType = selectedContract[0].quoteAsset;
  }

  useEffect(() => {
    localPositionsBook = positionsFromState.map((position) => ({ ...position, name: position.sym, val: position.sym }));
    let activePositionFromDropdown = localPositionsBook.filter((position) => position.val === selectedPosition);
    if (!activePositionFromDropdown.length) {
      activePositionFromDropdown = localPositionsBook;
      setSelectedSymbolPresentInPositions(false);
    }
    setActivePositionObject(activePositionFromDropdown[0]);
    if (activePositionFromDropdown.length) {
      setEmptyPositionsText("");
      if (activePositionObject && activePositionObject.marginRatio) {
        if (activePositionObject.marginRatio < 25) {
          setFetchedProgressStatus("1");
        } else if (activePositionObject.marginRatio < 50) {
          setFetchedProgressStatus("2");
        } else if (activePositionObject.marginRatio < 75) {
          setFetchedProgressStatus("3");
        } else {
          setFetchedProgressStatus("4");
        }
      }
      setPositionsDropdownValues(JSON.parse(JSON.stringify(localPositionsBook)));
    } else {
      setEmptyPositionsText("Take position to see the margin ratio");
    }
  }, [positionsFromState]);

  useEffect(() => {
    setSelectedPosition(selectedSymbol.toUpperCase());
  }, [selectedSymbol]);

  // store
  useEffect(() => {
    if (fetchedprogressStatus === "1") {
      setProgressStatus1("_active");
    } else if (fetchedprogressStatus === "2") {
      setProgressStatus2("_active");
    } else if (fetchedprogressStatus === "3") {
      setProgressStatus3("_active");
    } else if (fetchedprogressStatus === "4") {
      setProgressStatus4("_active");
    }
  }, [fetchedprogressStatus]);

  return (
    <Container id="marginRatioContainer" sx={{ border: 1, borderColor: "divider" }} maxWidth="xs">
      {emptyPositionsText.length > 0 && (
        <Grid container id="marginRatioValueContainer">
          <Grid item id="marginRatioLabel">
            <Typography variant="p" color="white">
              Margin Ratio:
            </Typography>
          </Grid>
          <Grid item id="marginRatioValue">
            <Typography variant="p" color="white">
              {"0%"}
            </Typography>
          </Grid>
          <Typography sx={{ marginTop: "10px" }} variant="p" color="white">
            {emptyPositionsText}
          </Typography>
          <Grid container my={1}>
            <Grid item id={`marginRatioProgress_1${progressStatus1}`}></Grid>
            <Grid item id={`marginRatioProgress_2${progressStatus2}`} ml={1}></Grid>
            <Grid item id={`marginRatioProgress_3${progressStatus3}`} ml={1}></Grid>
            <Grid item id={`marginRatioProgress_4${progressStatus4}`} ml={1}></Grid>
          </Grid>
        </Grid>
      )}
      {emptyPositionsText.length === 0 && (
        <>
          <Grid container id="marginRatioValueContainer">
            <Grid item id="marginRatioLabel">
              <Typography variant="p" color="white">
                Margin Ratio:
              </Typography>
            </Grid>
            <Grid item id="marginRatioValue">
              <Typography variant="p" color="white">
                {" "}
                {parseFloat(((activePositionObject && activePositionObject.marginRatio) || 0).toFixed(4)) + " % "}
              </Typography>
            </Grid>
          </Grid>
          <Select values={positionsDropdownValues} value={selectedSymbolPresentInPositions ? selectedPosition : activePositionObject && activePositionObject.sym} setValue={setSelectedPosition} />
          <Grid container my={1}>
            <Grid xs={2.5} item id={`marginRatioProgress_1${progressStatus1}`}></Grid>
            <Grid xs={2.5} item id={`marginRatioProgress_2${progressStatus2}`} ml={1}></Grid>
            <Grid xs={2.5} item id={`marginRatioProgress_3${progressStatus3}`} ml={1}></Grid>
            <Grid xs={2.5} item id={`marginRatioProgress_4${progressStatus4}`} ml={1}></Grid>
          </Grid>
          <Grid container id="maintenanceMarginContainer">
            <Grid item id="maintenanceMarginLabel">
              Maintenance Margin:
            </Grid>
            <Grid item id="maintenanceMarginValue">
              <Typography variant="p" color="white">
                {activePositionObject.maintMargin + " " + settlementCurrencyType}
              </Typography>{" "}
            </Grid>
          </Grid>
          <Grid container id="marginBalanceContainer">
            <Grid item id="marginBalanceLabel">
              Margin Balance:{" "}
            </Grid>
            <Grid item id="marginBalanceValue">
              <Typography variant="p" color="white">
                {activePositionObject.marginBalance + " " + settlementCurrencyType}
              </Typography>{" "}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default MarginRatio;
