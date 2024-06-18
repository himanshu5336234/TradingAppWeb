import clevertap from "clevertap-web-sdk";

export const recordCleverTapEvent = (eventName, params) => {
  clevertap.event.push(eventName, params);
};
