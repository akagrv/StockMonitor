// root reducer - meeting place for all the reducers

import { combineReducers } from "redux";
import auth from "./auth";

export default combineReducers({
  auth,
});
