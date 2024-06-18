import AppRouter from "./index";
import React from "react";
import ServerDownHelper from "@/pages/ErrorHandlerAuxiliary/ServerDownHelper";
import { useFeatureFlagEnabled } from "posthog-js/react";
export default function AppWrapper() {
  const isAppUnderMaintenance = useFeatureFlagEnabled("density-maintenance");
  return (
    <>
      {!isAppUnderMaintenance && <AppRouter />}
      {isAppUnderMaintenance && <ServerDownHelper />}
    </>
  );
}
