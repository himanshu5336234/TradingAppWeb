import axiosWithApiServer from "../../../frontend-api-service/Utils/axiosHelpers/axiosWithApiServer";
import { GENERATE_TOKEN } from "../../../frontend-api-service/URI";

export const generateToken = (body) => {
  return axiosWithApiServer({
    url: GENERATE_TOKEN.url,
    body: JSON.stringify(body),
    method: GENERATE_TOKEN.reqType
  });
};
