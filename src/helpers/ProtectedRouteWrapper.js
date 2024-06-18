/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Session from "supertokens-web-js/recipe/session";
import { useDispatch } from "react-redux";

function ProtectedRouteWrapper(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showUI, setShowUI] = useState(false);

  const sessionPayload = useRef({
    isFirstFactorComplete: false,
    isSecondFactorComplete: false
  });
  useEffect(() => {
    dispatch({ type: "PAUSE_RENDERING" });
    Session.doesSessionExist()
      .then((isSessionPresent) => {
        sessionPayload.current = {
          ...sessionPayload.current,
          isFirstFactorComplete: isSessionPresent
        };
        if (isSessionPresent) {
          Session.getAccessTokenPayloadSecurely().then((sessionSnapshot) => {
            sessionPayload.current = {
              ...sessionPayload.current,
              isSecondFactorComplete: sessionSnapshot["2fa-completed"] && sessionSnapshot["2fa-completed"].v
            };
            routeNavigator(sessionPayload.current);
          });
        } else {
          routeNavigator(sessionPayload.current);
        }
      })
      .catch(() => {
        sessionPayload.current = {
          ...sessionPayload.current,
          isFirstFactorComplete: false,
          isSecondFactorComplete: false
        };
        routeNavigator(sessionPayload.current);
      });
  }, []);

  function routeNavigator(sessionContext) {
    if (sessionContext.isFirstFactorComplete && sessionContext.isSecondFactorComplete) {
      setShowUI(true);
    } else {
      navigate("/auth");
    }
  }

  if (showUI) {
    return props.children;
  } else {
    return null;
  }
}

export default ProtectedRouteWrapper;
