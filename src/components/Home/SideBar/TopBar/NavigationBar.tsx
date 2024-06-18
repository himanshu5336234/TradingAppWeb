import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { logoutApp } from "@/frontend-BL/services/ThirdPartyServices/SuperTokens/SuperTokenHelper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomDivider from "@/components/UI/Divider/CustomDivider";
export default function NavigationBar({ state, setState }: { state: boolean; setState: Function }) {
  const Mobileroutes = [
    { name: "Trade", route: "/" },
    { name: "Orders", route: "/orders" },
    { name: "Assets", routes: "/wallet" },
    { name: "Portfolio", routes: "/portfolio" },
    { name: "Leaderboard", routes: "/leaderboard" },
    { name: "Profile", route: "/user" },
    "leaderboard"
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function onLogout() {
    dispatch({
      type: "DESTROY_SESSION"
    });
    logoutApp();
  }
  return (
    <div>
      <Drawer
        sx={{
          "& .MuiPaper-root": {
            backgroundImage: "none",
            backgroundColor: "background.primary",
            boxShadow: " 6px 8px 8px 0px #0000008F",
            top: 0,
            maxWidth: "205px",
            width: "100%"
          }
        }}
        anchor={"right"}
        open={state}
        onClose={() => setState(false)}
      >
        <List sx={{ " .MuiListItemText-primary": { fontSize: "12px" } }}>
          <ListItem disablePadding onClick={() => navigate("/")}>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Trade"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => navigate("/orders")}>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Orders"} />
            </ListItemButton>
          </ListItem>{" "}
          <ListItem disablePadding onClick={() => navigate("/wallet")}>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Assets"} />
            </ListItemButton>
          </ListItem>{" "}
          <ListItem disablePadding onClick={() => navigate("/portfolio")}>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Portfolio"} />
            </ListItemButton>
          </ListItem>{" "}
          <ListItem disablePadding onClick={() => navigate("/leaderboard")}>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Leaderboard"} />
            </ListItemButton>
          </ListItem>
        </List>

        <List sx={{ " .MuiListItemText-primary": { fontSize: "12px" } }}>
          <CustomDivider alignment={""} />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText sx={{ fontSize: "12px" }} primary={"Support"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText onClick={onLogout} primary={"Sign out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
