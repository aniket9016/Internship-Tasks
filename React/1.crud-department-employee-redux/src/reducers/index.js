import { combineReducers } from "redux";
import { departmentReducer } from "./departmentReducer";
import { employeeReducer } from "./employeeReducer";

export default combineReducers({
  departmentList: departmentReducer,
  employeeList: employeeReducer,
});
