import { GetAppURL } from "../frontend-api-service/Base";

export const internetDownAuxiliary = () => (window.location.href = GetAppURL() + "/internet-down-helper");
export const internetUpAuxiliary = () => (window.location.href = GetAppURL() + "/");
// export const javascriptCodeBreakHelper = (error) => {
//   if (error.includes("undefined") || error.includes("undefined")) window.location.href = GetAppURL() + "/javascript-break-helper";
// };
export const onVisibilityChange = () => {
  if (document.visibilityState === "hidden") {
    const intervalID = setInterval(reloadHandler, 1000 * 60 * 15);
    window.localStorage.intervalID = intervalID;
  } else {
    clearInterval(window.localStorage.intervalID || "");
    window.localStorage.intervalID = null;
  }
};

function reloadHandler() {
  window.location.reload();
}
