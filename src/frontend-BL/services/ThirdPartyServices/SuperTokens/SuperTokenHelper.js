import { posthog } from "posthog-js";
import { GetAppURL } from "../../../../frontend-api-service/Base";
import { useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
export const useCheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Session.doesSessionExist()
      .then((isSessionPresent) => {
        if (isSessionPresent) {
          Session.getAccessTokenPayloadSecurely().then((sessionPayload) => {
            setIsLoggedIn(sessionPayload["2fa-completed"]?.v);
            setIsLoading(true);
          });
        } else {
          setIsLoading(true);
        }
      })
      .catch(() => {
        setIsLoading(true);
      });
  }, [window.location]);

  return { isLoggedIn, isLoading };
};

export const logoutApp = async () => {
  localStorage.clear();
  await Session.signOut();
  posthog.reset();
  window.location.href = GetAppURL();
};
