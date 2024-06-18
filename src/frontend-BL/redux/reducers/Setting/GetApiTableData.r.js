import { GET_API_TABLE_DATA_FAIL, GET_API_TABLE_DATA_SUCCESS } from "../../constants/Constants";

const initialState = {
  ApiTableData: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_API_TABLE_DATA_SUCCESS:
      return {
        ...state,
        ApiTableData: payload
      };
    case GET_API_TABLE_DATA_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
