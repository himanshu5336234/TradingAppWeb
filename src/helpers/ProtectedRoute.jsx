/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import { EmailVerificationClaim } from "supertokens-auth-react/recipe/emailverification";
import { SecondFactorClaim } from "./SecondFactorClaim";
import { useNavigate } from "react-router-dom";

function ProtectedRoute(props) {
  return (
    <SessionAuth requireAuth={props.requireAuth === undefined ? true : props.requireAuth} key={props.key}>
      <ProtectedRouteHelper>{props.children}</ProtectedRouteHelper>
    </SessionAuth>
  );
}

function ProtectedRouteHelper(props) {
  const session = useSessionContext();
  const navigate = useNavigate();
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (!session.loading) {
      if (session.doesSessionExist) {
        if (session.invalidClaims.find((a) => a.validatorId === SecondFactorClaim.id)) {
          navigate("/second-factor");
        } else if (session.invalidClaims.find((a) => a.validatorId === EmailVerificationClaim.id)) {
          navigate("/auth/verify-email");
        } else {
          setShowUI(true);
        }
      } else {
        setShowUI(true);
      }
    }
  }, [session, navigate]);

  if (showUI) {
    return props.children;
  } else {
    return null;
  }
}

export default ProtectedRoute;
