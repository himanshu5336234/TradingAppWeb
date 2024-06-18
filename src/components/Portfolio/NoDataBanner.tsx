import React from "react";
import { Box } from "@mui/material";
import Sparkle from "@/assets/icons/ShineIcon.svg";
import NoTableDataIcon from "@/assets/images/NoTableDataIcon.svg";
import TextView from "../UI/TextView/TextView";
import { useNavigate } from "react-router-dom";

const NoDataBanner = ({ variant = "large" }: { variant?: "small" | "large" }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to top, #E2FF6F -890%, rgba(54, 208, 104, 0) 120%)",
        borderRadius: 2,
        padding: "16px 24px",
        gap: "32px",
        display: "flex",
        flexDirection: variant === "large" ? "row" : "column",
        borderWidth: 0.1,
        borderStyle: "solid",
        borderColor: "rgba(54, 208, 104, 0)",
        justifyContent: "space-between",
        alignItems: variant === "large" ? "center" : "flex-start",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box flexDirection={"column"} display={"flex"} gap={0.5}>
        <Box flexDirection={"row"} display={"flex"} gap={1} alignItems={"center"}>
          <img src={Sparkle} height={"24px"} width={"20px"} />
          <TextView text={"Unlock Insights"} variant="Bold_16" />
          <img src={Sparkle} height={"24px"} width={"20px"} />
        </Box>
        <TextView text={"Noticed you haven't traded in a while. Trade actively, aim high and become a pro trader!"} variant="Regular_12" />
      </Box>
      <TextView
        component={"h6"}
        onClick={() => navigate("/")}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          padding: variant === "large" ? "7.5px 12px" : 0,
          marginRight: 10
        }}
        text={"Trade Now"}
        variant="Medium_12"
      />
      <img src={NoTableDataIcon} alt="No data" style={{ position: "absolute", opacity: 0.2, right: -10, bottom: -10 }} />
    </Box>
  );
};

export default NoDataBanner;
