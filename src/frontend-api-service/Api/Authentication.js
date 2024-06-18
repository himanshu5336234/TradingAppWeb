import { Format } from "../../helpers/String";
import axiosWithApiServer from "../../frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";

import { SESSION_SIGNIN_URL } from "../URI";

export const SessionSignInApi = (loginCredentials) => {
  const url = Format(SESSION_SIGNIN_URL.url);
  return axiosWithApiServer({
    url,
    method: SESSION_SIGNIN_URL.reqType,
    body: loginCredentials
  });
};
