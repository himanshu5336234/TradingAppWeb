import { Box, Grid, Link } from "@mui/material";
import React, { Dispatch, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { maintaincenotice } from "@/assets/strings/constants";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";
import { FALLBACK_HANDLER } from "@/frontend-BL/redux/constants/Constants";
import { BASE_URL } from "@/frontend-api-service/Base";
import CustomDivider from "../UI/Divider/CustomDivider";
import TextView from "../UI/TextView/TextView";

const ConnectionStatus = () => {
  const DenstityConnection = useSelector((state: any) => state.wsConnection.density.opened);
  const ERROR_COUNT_THRESHOLD = 3;
  const dispatch: Dispatch<any> = useDispatch();
  const errorCount = useSelector((state: any) => state.FallbackHandler.errorCount);
  useEffect(() => {
    if (errorCount === ERROR_COUNT_THRESHOLD) {
      dispatch(
        showSnackBar({
          src: FALLBACK_HANDLER,
          message: maintaincenotice,
          type: "warning"
        })
      );
    }
  }, [errorCount]);
  return (
    <Box>
      <CustomDivider alignment={"horizontal"} />
      <Grid container>
        <Grid item xs={1.5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",

              width: "110px",
              borderRight: "0.5px solid #50535e"
            }}
          >
            <TextView
              component={"p"}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: [DenstityConnection ? "text.success" : "text.error"]
              }}
            />
            <TextView variant="Regular_12" color={"text.regular"} component={"span"} text={"Operational"} />
          </Box>
        </Grid>
        {errorCount === ERROR_COUNT_THRESHOLD && (
          <Grid item xs={11}>
            <Box
              p={0.5}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "100%",
                background: "linear-gradient(90deg, rgba(255, 228, 147, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%)"
              }}
            >
              <ErrorRoundedIcon
                sx={{
                  fontSize: "17px",
                  marginRight: "0.25rem",
                  marginLeft: "0.5rem",
                  color: "#ECA233"
                }}
              />
              <TextView variant="Regular_12" text={maintaincenotice} component={"span"}>
                <Link
                  target="_blank"
                  href={BASE_URL().maintainceUrl}
                  sx={{
                    ml: 1,
                    color: "text.main",
                    textDecoration: "underline"
                  }}
                >
                  {"Maintenance dashboard"}
                </Link>
              </TextView>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default memo(ConnectionStatus);
