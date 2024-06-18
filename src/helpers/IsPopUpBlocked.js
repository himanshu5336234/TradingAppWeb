const popUpProps = [
  `toolbar=no,
location=no,
status=no,
menubar=no,
scrollbars=yes,
resizable=yes,
width=0,
height=0`
];

export const isPopUpBlocked = (url) => {
  const popUpWin = window.open(url, "_blank", popUpProps[0]);
  try {
    popUpWin.close();
    if (window.open(url, "targetWindow", popUpProps[0])) {
      window.open(url, "targetWindow", popUpProps[0]).close();
      return false;
    }
    return true;
  } catch {
    return true;
  }
};
