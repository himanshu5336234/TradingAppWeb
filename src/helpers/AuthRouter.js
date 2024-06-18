import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Session from "supertokens-web-js/recipe/session";

function AuthRouter() {
  const navigate = useNavigate();

  const sessionSnapshot = useRef({
    isFirstFactorComplete: false,
    isSecondFactorComplete: false,
    isEmailVerificationComplete: false,
    phoneNumber: null
  });

  useEffect(() => {
    Session.doesSessionExist()
      .then((isSessionPresent) => {
        sessionSnapshot.current = {
          ...sessionSnapshot.current,
          isFirstFactorComplete: isSessionPresent
        };
        if (isSessionPresent) {
          Session.getAccessTokenPayloadSecurely().then((sessionPayload) => {
            sessionSnapshot.current = {
              ...sessionSnapshot.current,
              isSecondFactorComplete: sessionPayload["2fa-completed"] && sessionPayload["2fa-completed"].v,
              phoneNumber: sessionPayload.phoneNumber
            };
            routeNavigator(sessionSnapshot.current);
          });
        } else {
          routeNavigator(sessionSnapshot.current);
        }
      })
      .catch(() => {
        sessionSnapshot.current = {
          ...sessionSnapshot.current,
          isFirstFactorComplete: false,
          isSecondFactorComplete: false
        };
        routeNavigator(sessionSnapshot.current);
      });
  }, []);

  function routeNavigator(sessionContext) {
    if (sessionContext.isFirstFactorComplete && sessionContext.isSecondFactorComplete) {
      navigate("/");
    } else if (sessionContext.isFirstFactorComplete && !sessionContext.isSecondFactorComplete) {
      if (sessionContext.phoneNumber) {
        navigate("/auth/second-factor");
      } else {
        navigate("/auth/signup/second-factor");
      }
    } else if (!sessionContext.isFirstFactorComplete && !sessionContext.isSecondFactorComplete) {
      navigate("/auth/signin");
    }
  }
}

// export function getCurrentRoute() {
//   const location = useLocation();
//   return location.pathname;
// }

export default AuthRouter;
