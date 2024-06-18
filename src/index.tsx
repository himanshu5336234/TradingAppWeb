import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import * as configureStore from "BL/redux/store/configureStore";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import clevertap from "clevertap-web-sdk";

posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY ? process.env.REACT_APP_PUBLIC_POSTHOG_KEY : "", {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_URL ?? "https://app.posthog.com"
});

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container); // No need for non-null assertion operator in TypeScript
const store = configureStore.default;
clevertap.init("4WZ-9ZZ-7W7Z");
root.render(
  <Provider store={store}>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </Provider>
);
