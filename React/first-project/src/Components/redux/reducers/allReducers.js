import { combineReducers } from "redux";
import counter from "./counterReducer";
import todo from "./todoReducer";
import auth from "./authReducer";

const allReducers = combineReducers({
  counter,
  todo,
  auth,
});

export default allReducers;
