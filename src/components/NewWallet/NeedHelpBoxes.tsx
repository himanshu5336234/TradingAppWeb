import React from "react";
import { Box } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import { recordCleverTapEvent } from "@/utils/recordCleverTapEvent";
const NeedHelpBoxes = ({
  link,
  imgSrc,
  title,
  description,
  linktext,
  paymentMethod
}: {
  link: string;
  imgSrc: string;
  title: string;
  description: string;
  linktext: string;
  paymentMethod: string;
}) => {
  const handleRedirect = () => {
    const eventName = title === "Density Blogs" ? "DEPOSIT_READ_BLOGS_CLICKED" : "DEPOSIT_WATCH_VIDEO_CLICKED";
    recordCleverTapEvent(eventName, {
      paymentMode: paymentMethod || "TBD"
    });
    window.open(link, "__blank");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        maxWidth: "300px",
        gap: 1,
        position: "relative",
        backgroundColor: "background.primary",
        borderRadius: "8px"
      }}
    >
      <TextView variant={"Medium_16"} text={title}></TextView>
      <TextView variant={"Regular_14"} color={"text.regular"} text={description}></TextView>
      <TextView
        variant={"Bold_14"}
        component={"p"}
        style={{
          mt: 5,
          mb: 1,
          textDecoration: "underline",
          cursor: "pointer",
          textDecorationThickness: "2px",
          textUnderlineOffset: "4px"
        }}
        text={linktext}
        onClick={() => handleRedirect()}
      ></TextView>
      <img
        src={imgSrc}
        style={{
          position: "absolute",
          bottom: "0",
          right: "0"
        }}
      />
    </Box>
  );
};

export default NeedHelpBoxes;
