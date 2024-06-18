import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";

import { BASE_URL } from "@/frontend-api-service/Base";

function SuperTokensMain() {
  SuperTokens.init({
    appInfo: {
      // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
      appName: "Density",
      apiDomain: BASE_URL().densityBaseUrl,
      apiBasePath: "/auth"
    },
    recipeList: [Session.init()]
  });
}

export default SuperTokensMain;
