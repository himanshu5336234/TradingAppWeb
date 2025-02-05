import React from "react";
import PropTypes from "prop-types";

const WaveFormSVG = ({ isGradientGreen }) => {
  return (
    <svg width="613" height="100" viewBox="0 0 613 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.2"
        d="M612.844 77.8126C611.908 76.1924 610.972 74.6069 610.047 73.0098C587.899 35.5947 556.348 16.3027 529.916 18.4784C437.993 19.2082 422.654 41.2487 459.947 77.7894H612.844V77.8126Z"
        fill="url(#paint0_linear_1_308)"
      />
      <path
        opacity="0.2"
        d="M0.548622 60.7945C31.3135 19.026 25.3236 8.76423 67.3027 18.8669C96.9254 25.9907 156.883 -0.566012 183.078 19.1441C217.106 44.7229 222.341 41.4823 252.346 18.8669C292.836 -11.6114 366.287 -1.06999 403.062 41.0771C414.443 54.1343 425.366 70.614 436.701 84.6077L0.827811 89.3292L0.548622 60.7945Z"
        fill="url(#paint1_linear_1_308)"
      />
      <path
        opacity="0.2"
        d="M99.6782 63.3571C126.271 11.2545 129.954 16.6085 166.491 29.4147C192.273 38.4449 235.376 -12.7261 258.226 12.0286C287.907 44.1541 370.809 51.0683 396.813 22.9126C425.757 -7.97978 431.085 20.0508 441.064 33.4884C451.008 49.8628 469.078 77.3893 478.986 94.9345L100.027 99.0395L99.6782 63.3571Z"
        fill="url(#paint2_linear_1_308)"
      />
      <defs>
        <linearGradient id="paint0_linear_1_308" x1="536.428" y1="-8.52343" x2="496.588" y2="90.5744" gradientUnits="userSpaceOnUse">
          <stop stopColor={isGradientGreen ? "#96FFE1" : "#F46151"} stopOpacity="0.67" />
          <stop offset="1" stopColor={isGradientGreen ? "#00C48C" : "#F46151"} />
        </linearGradient>
        <linearGradient id="paint1_linear_1_308" x1="224.387" y1="-65.6913" x2="272.828" y2="126.015" gradientUnits="userSpaceOnUse">
          <stop stopColor={isGradientGreen ? "#96FFE1" : "#F46151"} stopOpacity="0.62" />
          <stop offset="1" stopColor={isGradientGreen ? "#00C48C" : "#F46151"} />
        </linearGradient>
        <linearGradient id="paint2_linear_1_308" x1="293.826" y1="-107.391" x2="375.022" y2="118.755" gradientUnits="userSpaceOnUse">
          <stop stopColor={isGradientGreen ? "#96FFE1" : "#F46151"} stopOpacity="0.62" />
          <stop offset="1" stopColor={isGradientGreen ? "#00C48C" : "#F46151"} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WaveFormSVG;
WaveFormSVG.propTypes = {
  isGradientGreen: PropTypes.bool
};
