import {
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from "../actions/actionConstant";

const initialState = [];

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_READ_SUCCESS:
      return action.payload;
    case EMPLOYEE_CREATE_SUCCESS:
      return [...state, action.payload];
    case EMPLOYEE_UPDATE_SUCCESS:
      return state.map((emp) => (emp.id === action.payload.id ? action.payload : emp));
    case EMPLOYEE_DELETE_SUCCESS:
      return state.filter((emp) => emp.id !== action.payload);
    default:
      return state;
  }
};
