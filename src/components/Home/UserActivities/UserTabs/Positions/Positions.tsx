import React, { useCallback, useState } from "react";
// Assets, Strings and constants
import { PositionHeader } from "../../UserActivitiesObjects";
// Mui
import { Box, Grid, Tooltip } from "@mui/material";
// Redux
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import PositionRow from "./PositionRow/PositionRow";
import TableNoRowsOverlay from "@/components/Setting/Rewards/TableNoRowsOverlay";
import TextView from "@/components/UI/TextView/TextView";
import { SET_LEVERAGE_POS_RISK } from "@/frontend-BL/redux/constants/Constants";
const Positions = ({ hideOtherPairs }: { hideOtherPairs: boolean }) => {
  const dispatch = useDispatch();
  const symbol = useSelector((state: any) => state.selectSymbol.selectedSymbol);
  const [showTPSLColumn] = useState(true);
  const openPositions = useSelector((state: any) => state.positionsDirectory.currentPositions);
  const isSnapshotUpdated = useSelector((state: any) => state.positionsDirectory.isSnapshotUpdated);
  const SNAPSHOT_FETCH_IN_PROGRESS_TEXT = "Please wait while we get your positions!";
  const NO_POSITIONS_TEXT = "No active positions";
  const renderActivePositions = useCallback(
    (payload: any[]) => {
      return payload.map((data, index) => {
        dispatch({
          type: SET_LEVERAGE_POS_RISK,
          payload: {
            sym: data.sym,
            leverage: data.leverage
          }
        });
        if (hideOtherPairs) {
          return (
            <Box
              sx={{
                display: data.sym.toUpperCase() === symbol.toUpperCase() ? "block" : "none"
              }}
              component={"div"}
              key={index}
              id={`position-row-${index}`}
            >
              <PositionRow index={index} data={data} />
            </Box>
          );
        } else {
          return (
            <Box component={"div"} key={index} id={`position-row-${index}`}>
              <PositionRow index={index} data={data} />
            </Box>
          );
        }
      });
    },
    [hideOtherPairs, openPositions, symbol]
  );

  return (
    <Box>
      <Grid pt={3} px={2.5} container>
        {PositionHeader.map(
          (headerData, i) =>
            (headerData.id !== 10 || showTPSLColumn) && (
              <Grid item key={i} xs={headerData.gridSize}>
                {headerData.tooltip ? (
                  <Tooltip
                    componentsProps={{
                      tooltip: {
                        sx: {
                          color: "#ffff",
                          fontSize: "11px",
                          backgroundColor: "background.tertiary",
                          fontWeight: 600,
                          p: "10px"
                        }
                      }
                    }}
                    arrow
                    placement="top"
                    title={<TextView text={headerData.tooltip} />}
                  >
                    {" "}
                    <TextView text={headerData.name.toUpperCase()} variant="medium_12_700" textAlign={headerData.align} color={"text.regular"} component={"h6"} />
                  </Tooltip>
                ) : (
                  <TextView text={headerData.name.toUpperCase()} variant="medium_12_700" textAlign={headerData.align} color={"text.regular"} component={"h6"} />
                )}
              </Grid>
            )
        )}
      </Grid>
      {!isSnapshotUpdated && openPositions.length === 0 && (
        <>
          <Grid item my={2}>
            <TableNoRowsOverlay message={SNAPSHOT_FETCH_IN_PROGRESS_TEXT} />
          </Grid>
        </>
      )}
      {isSnapshotUpdated && openPositions.length === 0 && (
        <>
          <Grid item my={2}>
            <TableNoRowsOverlay message={NO_POSITIONS_TEXT} />
          </Grid>
        </>
      )}

      <Box
        sx={{
          pr: 1.5,
          overflow: "auto",
          maxHeight: "300px"
        }}
      >
        {renderActivePositions(openPositions)}
      </Box>
    </Box>
  );
};

Positions.propTypes = {
  hideOtherPairs: PropTypes.bool
};

export default Positions;
