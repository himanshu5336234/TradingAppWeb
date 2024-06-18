import React from "react";
import { SideBarIconProps } from "./SideBarIcon.types";

const MarketIcon = ({ fill = "none", strokeColor = "#8B8B97" }: SideBarIconProps) => {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 9L16.146 15.0213C15.4517 15.7354 14.3261 15.7354 13.6318 15.0213L12.5904 13.9501C11.8961 13.236 10.7705 13.236 10.0763 13.9501L6 18.1429M22 9H16.6667M22 9V14.4857"
        stroke={strokeColor}
        fill={fill}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MarketIcon;
