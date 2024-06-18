import React from "react";
import { Box } from "@mui/material";
// import WarningIcon from "../../../../../assets/images/WarningIcon.svg";
import SuccessICon from "../../assets/images/SnackbarImages/Success.svg";
import ErrorIcom from "../../assets/images/SnackbarImages/Error.svg";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { getSupportChat } from "@/helpers";
import TextView from "@/components/UI/TextView/TextView";
interface ComponentProps {
  message: string;
  heading: string;
  type: "SUCCESS" | "FAILED";
  handlePrimaryClick: () => void;
}
const StatusComponent: React.FC<ComponentProps> = ({ message, heading, type, handlePrimaryClick }) => {
  const { openFcSupportChat } = getSupportChat();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "background.primary",
        py: 3.5,
        px: 4,
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <TextView variant={"Medium_22"} color={"text.primary"}>
          {heading}
          <TextView
            component={"div"}
            style={{
              mt: 1
            }}
            variant={"Regular_16"}
            color={"text.regular"}
            text={message}
          ></TextView>
        </TextView>

        <Box
          sx={{
            display: "flex",
            maxWidth: "600px",
            gap: 2,
            mt: 4.5
          }}
        >
          <CustomButton label={"Contact Support"} variant={"secondary"} onClick={() => openFcSupportChat()} />
          <CustomButton label={"View Transaction History"} variant={"primary"} onClick={handlePrimaryClick} />
        </Box>
      </Box>
      <img src={type === "SUCCESS" ? SuccessICon : ErrorIcom} height={"124px"} />
    </Box>
  );
};

export default StatusComponent;
