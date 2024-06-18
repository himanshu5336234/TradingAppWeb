// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { IS_LOW_END_DEVICE, NOT_A_LOW_END_DEVICE } from "@/frontend-BL/redux/constants/Constants";

// const useCheckLowEndDevice = () => {
//   const checkIfLowEndDeviceBasedOnRAM = () => navigator.deviceMemory < 6;

//   const checkIfLowEndDeviceBasedOnNumberOfCores = () => navigator.hardwareConcurrency < 4;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (checkIfLowEndDeviceBasedOnRAM() || checkIfLowEndDeviceBasedOnNumberOfCores()) {
//       dispatch({
//         type: IS_LOW_END_DEVICE
//       });
//     } else {
//       dispatch({
//         type: NOT_A_LOW_END_DEVICE
//       });
//     }
//   }, []);
// };

// export default useCheckLowEndDevice;
