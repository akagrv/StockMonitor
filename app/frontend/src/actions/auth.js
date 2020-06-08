import axios from "axios";
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./types";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  // get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
