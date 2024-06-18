// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
// import { useEffect } from "react";
// import { deploymentEnv, envVariable } from "../../../frontend-api-service/Base";

// function SentryMain() {
//   useEffect(() => {
//     envVariable() !== deploymentEnv.LOCAL &&
//     Sentry.init({
//       environment: envVariable(),
//       dsn: "https://c44ce2eb6c794c7cab97389e9e10f709@o4504082027053056.ingest.sentry.io/4504082077777920",
//       integrations: [new BrowserTracing()],
//       tracesSampleRate: 1.0
//     });
//   });
// }

// export default SentryMain;
