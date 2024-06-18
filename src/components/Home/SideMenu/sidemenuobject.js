const sideMenuBox = {
  // maxWidth: 350,
  height: "100%",
  bgcolor: "background.primary"
};

const Typography = {
  fontWeight: 600,
  fontSize: "12px"
};

const drawerStyleSx = {
  "&::-webkit-scrollbar": {
    width: "0.4em"
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
    outline: "1px solid slategrey"
  },
  "& .MuiPaper-root": {
    boxShadow: " 6px 8px 8px 0px #0000008F",
    top: 0,
    left: { sm: 60, xs: 0 },
    maxWidth: "400px",
    height: "calc(100% - 30px)",
    width: "100%"
  }
};

const tabHeader = {
  display: "flex",
  padding: "0px"
};

const drawer = {
  opacity: 1,
  backgroundColor: "#1b1b1f00",
  backdropFilter: "blur(0px)"
};

const menu = { height: "100%" };

const fav = {
  fontSize: "11px",
  lineHeight: 2.5,
  color: "text.secondary"
};
const SymbolLogo = {
  height: "23px",
  width: "23px",
  margin: "0px 10px",
  padding: "1px",
  backgroundColor: "#fff",
  borderRadius: "50%"
};
export { SymbolLogo, menu, fav, sideMenuBox, tabHeader, drawerStyleSx, drawer, Typography };
