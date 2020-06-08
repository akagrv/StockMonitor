import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
} from "./types";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", getConfig(getState))
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

// login user
export const loginUser = (username, password) => (dispatch, getState) => {
  const body = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", body, getConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// register user
export const registerUser = (username, email, password) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ username, email, password });

  axios
    .post("/api/auth/register", body, getConfig(getState))
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// logout user
export const logoutUser = () => (dispatch, getState) => {
  axios.post("/api/auth/logout", null, getConfig(getState)).then((res) => {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  });
};

// helper function
export const getConfig = (getState) => {
  // Get token
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
