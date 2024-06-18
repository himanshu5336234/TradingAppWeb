import axios from "axios";

const createDeepLink = (linkData) => {
  return axios
    .request(linkData)
    .then((res) => {
      return new Promise((resolve, reject) => {
        resolve(res?.data?.url);
      });
    })
    .catch((error) => {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    });
};

export default createDeepLink;
