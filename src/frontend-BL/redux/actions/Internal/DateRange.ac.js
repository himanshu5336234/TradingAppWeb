import { UPDATE_DATE_RANGE_SUCCESS, RESET_DATE_RANGE_SUCCESS } from "../../../redux/constants/Constants";

export const updateDateRange = (fromDate, toDate) => (dispatch) => {
  const dateRange = {
    from: fromDate,
    to: toDate
  };
  dispatch({
    type: UPDATE_DATE_RANGE_SUCCESS,
    payload: dateRange
  });
};

export const resetDateRange = () => (dispatch) => {
  dispatch({
    type: RESET_DATE_RANGE_SUCCESS
  });
};
