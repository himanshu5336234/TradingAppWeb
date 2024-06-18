import { typography } from "@/assets/Theme/typography";

export const SharePnlModalContainer = {
  maxWidth: { lg: "528px", sm: "512px" },
  minHeight: 352,
  backgroundColor: "transparent"
};

export const ShareActionsContainer = {
  position: "absolute",
  backgroundColor: "#2C2C34",
  height: "54px",
  width: 512,
  top: 294,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: "17.5px",
  py: "12px"
};

export const ShareCardFlex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px",
  cursor: "pointer"
};

export const ShareCardArrow = {
  marginRight: "10px",
  width: "30px"
};

export const ShareCardROEPositive = {
  fontSize: typography.Medium_40,
  color: "text.success"
};
export const ShareCardROENegative = {
  fontSize: typography.Medium_40,
  color: "text.error"
};

export const ShareCardFlexEnd = {
  display: "flex",
  justifyContent: "flex-end"
};

export const ShareCardQRCode = {
  height: 56,
  width: 55.5,
  color: "primary"
};

export const DownloadWrapper = { display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "12px" };

export const ShareViaWrapper = { display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "16px" };

export const PositionDataBox = { display: "flex", justifyContent: "space-between", alignItems: "center" };

export const ShareCardWrapper = { mt: 0, position: "relative", height: 298, width: 512, backgroundColor: "#1F1F24" };

export const ShareQRCodeWrapper = { position: "absolute", right: 0, top: 225, width: 100, height: 56.5, display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 };

export const WaveFormWrapper = { position: "absolute", width: 512, height: 32, overflow: "hidden", left: 0, top: 275 };

// mweb
export const ShareActionsMobileContainer = {
  position: "absolute",
  backgroundColor: "#2C2C34",
  height: 72,
  width: "100%",
  bottom: 0,
  left: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: "16px",
  py: "12px"
};
