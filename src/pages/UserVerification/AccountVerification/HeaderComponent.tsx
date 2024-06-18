import React from "react";
import { Box, Typography } from "@mui/material";
import TextView from "@/components/UI/TextView/TextView";
import { useNavigate } from "react-router-dom";
import { getSupportChat } from "@/helpers";

interface HeaderComponentProps {
  heading: string;
  subHeading: string;
  tagLine: string;
  LinkButton: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ heading, subHeading, tagLine, LinkButton }) => {
  const navigate = useNavigate();
  const { openFcSupportChat } = getSupportChat();
  return (
    <>
      <TextView component="p" color="text.quaternary" variant="Medium_14" text={heading} style={{}} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Typography
          onClick={() => {
            navigate(-1);
          }}
          sx={{ fontSize: "32px", cursor: "pointer" }}
          component={"span"}
        >
          &#8592;
        </Typography>

        <TextView component="p" style={{ minWidth: "300px" }} variant="SemiBold_32" text={subHeading} />
      </Box>
      <TextView component="p" color="text.quaternary" variant="Regular_16" text={tagLine} style={{ mt: 3 }}>
        <TextView
          onClick={openFcSupportChat}
          component="span"
          variant="Bold_14"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            paddingX: "3px"
          }}
          text={LinkButton}
        />
      </TextView>
    </>
  );
};

export default HeaderComponent;
