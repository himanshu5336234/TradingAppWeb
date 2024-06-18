import { Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CampaignIcon from "@mui/icons-material/Campaign";
import { NOTIFY_ICON } from "./styles";

function NoticeBoard() {
  return (
    <Container sx={{ backgroundColor: "background.secondary", py: "22px" }}>
      <Typography variant={"SemiBold_18"} component={"h1"}>
        Notice Board
      </Typography>
      <List
        sx={{
          bgcolor: "background.secondary",
          maxHeight: "445px",
          overflow: "auto"
        }}
      >
        <ListItem alignItems="flex-start">
          <NotificationsIcon sx={NOTIFY_ICON}></NotificationsIcon>
          <ListItemText
            primary="Notification"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <CampaignIcon sx={{ fontSize: "18px", my: "8px", mx: "8px" }}></CampaignIcon>
          <ListItemText
            primary="Announcement"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <NotificationsIcon sx={{ fontSize: "18px", my: "8px", mx: "8px" }}></NotificationsIcon>
          <ListItemText
            primary="Announcement"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <NotificationsIcon sx={{ fontSize: "18px", my: "8px", mx: "8px" }}></NotificationsIcon>
          <ListItemText
            primary="Announcement"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <NotificationsIcon sx={{ fontSize: "18px", my: "8px", mx: "8px" }}></NotificationsIcon>
          <ListItemText
            primary="Announcement"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <NotificationsIcon sx={{ fontSize: "18px", my: "8px", mx: "8px" }}></NotificationsIcon>
          <ListItemText
            primary="Announcement"
            secondary={
              <>
                <Typography component={"span"} sx={{ color: "white" }} variant={"Regular_12"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="middle" />
      </List>
    </Container>
  );
}

export default NoticeBoard;
