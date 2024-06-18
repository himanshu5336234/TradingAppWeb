/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Session from "supertokens-web-js/recipe/session";

function UnprotectedRouteWrapperForFirstFactor(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionPayload = useRef({
    isFirstFactorComplete: false,
    isSecondFactorComplete: false
  });

  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
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
    dispatch({ type: "PAUSE_RENDERING" });
  }, []);

  function routeNavigator(sessionContext) {
    if (sessionContext.isFirstFactorComplete || sessionContext.isSecondFactorComplete) {
      navigate("/auth");
    } else {
      setShowUI(true);
    }
  }

  if (showUI) {
    return props.children;
  } else {
    return null;
  }
}

export default UnprotectedRouteWrapperForFirstFactor;
