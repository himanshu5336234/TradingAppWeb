import { generateToken } from "../../../../frontend-api-service/Api/User/GenerateToken";

export const GENERATE_TOKEN = async (type) => {
  try {
    const { data } = await generateToken({ token_type: type });
    return data.token;
  } catch (err) {
    console.log("token failed", err);
  }
};
