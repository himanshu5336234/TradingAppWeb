import { useEffect, useRef } from "react";

import { signInUpWithGoogleApi } from "@/frontend-api-service/Api/SessionManagement";

import { GetAppURL } from "@/frontend-api-service/Base";
import { recordCleverTapEvent } from "../../utils/recordCleverTapEvent";

function AuthorisationCallback() {
  const shouldSocialLoginBeCalled = useRef(true);

  useEffect(() => {
    if (shouldSocialLoginBeCalled.current) {
      shouldSocialLoginBeCalled.current = false;
      signInUpWithGoogleApi(
        JSON.stringify({
          redirectURI: GetAppURL() + "/auth/callback/google",
          thirdPartyId: "google",
          code: new URLSearchParams(window.location.href.substring(window.location.href.indexOf("?"))).get("code")
        })
      ).then((isAuthenticated) => {
        if (isAuthenticated.data.status === "OK") {
          window.localStorage.setItem("socialLoginEmail", isAuthenticated.data?.user?.email);
        }
        if (isAuthenticated.data.status !== "OK") {
          window.localStorage.setItem("socialLoginErr", JSON.stringify(isAuthenticated.data));
          window.localStorage.setItem("socialLoginError", isAuthenticated.data.message);
        }
        window.location.href = GetAppURL() + "/auth";
      });
    }
  }, []);

  return null;
}

export default AuthorisationCallback;
