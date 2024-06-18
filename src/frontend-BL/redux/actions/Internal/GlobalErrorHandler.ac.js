export const showSnackBar = (data) => (dispatch) => {
  dispatch({
    type: "GLOBAL_ERROR_ADD",
    payload: {
      src: data?.src,
      errorMessage: data?.message,
      dialogType: data?.type,
      errorHandlerForReduxStateUpdation: () =>
        dispatch({
          type: "GLOBAL_ERROR_REMOVE",
          payload: { src: data?.src }
        })
    }
  });
};
