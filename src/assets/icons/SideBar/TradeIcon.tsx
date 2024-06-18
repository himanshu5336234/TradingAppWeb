import React from "react";
import { SideBarIconProps } from "./SideBarIcon.types";

const TradeIcon = ({ fill = "none", strokeColor = "#8B8B97" }: SideBarIconProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.83301 11.7778H9.38856V18H5.83301V11.7778ZM12.0552 9.11108H15.6108V20.6666H12.0552V9.11108Z" fill={fill} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M12.832 23.3334C12.832 23.8857 13.2797 24.3334 13.832 24.3334C14.3843 24.3334 14.832 23.8857 14.832 23.3334H12.832ZM14.832 21.5557V20.5557H12.832V21.5557H14.832ZM14.832 23.3334V21.5557H12.832V23.3334H14.832Z"
        fill={strokeColor}
      />
      <path d="M18.2783 8.22241H21.8339V12.2224H18.2783V8.22241Z" fill={fill} stroke={strokeColor} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.61133 11.7779V7.33341M20.0558 18.0001V12.2223M20.0558 8.2223V4.66675" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default TradeIcon;
