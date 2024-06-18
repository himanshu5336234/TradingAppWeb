import { useDispatch, useSelector } from "react-redux";
import { GetApiTableDataAction } from "@/frontend-BL/redux/actions/Setting/GetApiTableData.ac";
import { addApiKey, deleteAuthKey } from "@/frontend-api-service/Api";
import { GET_API_TABLE_DATA_SUCCESS } from "@/frontend-BL/redux/constants/Constants";
import { showSnackBar } from "@/frontend-BL/redux/actions/Internal/GlobalErrorHandler.ac";

const useApiManagement = () => {
  const dispatch = useDispatch();
  const { ApiTableData } = useSelector((state) => state.GetApiTableData);

  // it will fetch and update tableData state for you
  const updateApiTableDataState = () => {
    dispatch(GetApiTableDataAction());
  };

  // returns "asc" or "desc"
  const getApiTableSortDirection = () => {
    let sortDirection = "asc";

    if (ApiTableData.length > 1 && new Date(ApiTableData[0].Date).getTime() > new Date(ApiTableData[1].Date).getTime()) {
      sortDirection = "desc";
    }

    return sortDirection;
  };

  // only creates Key does not add it to ApiTableData State in store
  function createNewApiKey(CreateApiFormData) {
    return addApiKey(JSON.stringify(CreateApiFormData))
      .then((response) => {
        return new Promise((resolve, reject) => {
          if (response?.data) resolve(response?.data);
          else reject(new Error("Promise fulfilled with no data"));
        });
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "CREATE_API_KEY_FAILED",
            message: errorResponse.response.data.details,
            type: "failure"
          })
        );
        return new Promise((resolve, reject) => {
          if (errorResponse) reject(errorResponse);
        });
      });
  }

  // Delete Api Key and update it in the table
  const deleteApiKey = (Id) => {
    deleteAuthKey(Id)
      .then(() => {
        dispatch({
          type: GET_API_TABLE_DATA_SUCCESS,
          payload: ApiTableData.filter((row) => row.Id !== Id)
        });
        // for success snackbar
        dispatch(
          showSnackBar({
            src: "DELETE_API_KEY",
            message: "API Key Deleted",
            type: "success"
          })
        );
      })
      .catch((errorResponse) => {
        dispatch(
          showSnackBar({
            src: "DELETE_API_KEY_FAILED",
            message: errorResponse?.response?.data?.details,
            type: "failure"
          })
        );
      });
  };

  //  add Created Key to ApiTableData State in store
  const addNewApiKeyToState = (NewApiKeyData) => {
    const sortDirection = getApiTableSortDirection();

    const modifiedNewApiKeyData = {
      Date: new Date(NewApiKeyData?.created).toLocaleString("en-US", {
        hour12: false
      }),
      Id: NewApiKeyData.id,
      Permissions: NewApiKeyData.access_list
    };

    dispatch({
      type: GET_API_TABLE_DATA_SUCCESS,
      payload: sortDirection === "asc" ? [...ApiTableData, modifiedNewApiKeyData] : [modifiedNewApiKeyData, ...ApiTableData]
    });
    // for success snackbar
    dispatch(
      showSnackBar({
        src: "ADD_NEW_API_KEY",
        message: "New Api Key Created",
        type: "success"
      })
    );
  };

  return {
    createNewApiKey,
    deleteApiKey,
    updateApiTableDataState,
    addNewApiKeyToState,
    getApiTableSortDirection,
    dispatch
  };
};

export default useApiManagement;
