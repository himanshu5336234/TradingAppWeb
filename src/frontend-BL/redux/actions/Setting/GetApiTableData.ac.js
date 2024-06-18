import { getAuthKeys } from "@/frontend-api-service/Api";
import { GET_API_TABLE_DATA_FAIL, GET_API_TABLE_DATA_SUCCESS } from "@/frontend-BL/redux/constants/Constants";

export const GetApiTableDataAction = () => (dispatch) => {
  getAuthKeys()
    .then((successResponse) => {
      const TableRaw = successResponse.data.token_detail_list;
      const TempTableData = [];
      TableRaw?.map((row) => {
        TempTableData.push({
          Date: new Date(row?.created).toLocaleString("en-US", {
            hour12: false
          }),
          Id: row.id,
          Permissions: row.access_list
        });
        return true;
      });
      dispatch({ type: GET_API_TABLE_DATA_SUCCESS, payload: TempTableData });
    })
    .catch((error) => {
      dispatch({ type: GET_API_TABLE_DATA_FAIL, payload: [error] });
    });
};
