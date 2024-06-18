import { CREATE_API_KEY, DELETE_AUTH_KEY, GET_AUTH_KEYS, VALIDATE_OTP } from "../../URI/index";
import axiosWithApiServer from "../../Utils/axiosHelpers/axiosWithApiServer";
import { Format } from "../../../helpers/index";

export const addApiKey = (ApiDetails) => {
  const url = Format(CREATE_API_KEY.url);
  return axiosWithApiServer({
    url,
    method: CREATE_API_KEY.reqType,
    body: ApiDetails
  });
};

export const getAuthKeys = () => {
  const url = Format(GET_AUTH_KEYS.url);
  return axiosWithApiServer({
    url,
    method: GET_AUTH_KEYS.reqType
  });
};

export const deleteAuthKey = (keyDetails, id) => {
  const url = Format(DELETE_AUTH_KEY.url, id);
  return axiosWithApiServer({
    url,
    method: DELETE_AUTH_KEY.reqType,
    body: keyDetails
  });
};

export const createOTP = () => {
  const url = Format(VALIDATE_OTP.url);
  return axiosWithApiServer({
    url,
    method: VALIDATE_OTP.reqType
  });
};
