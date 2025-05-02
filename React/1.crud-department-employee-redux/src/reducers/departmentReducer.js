import {
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_READ_SUCCESS,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_DELETE_SUCCESS,
} from "../actions/actionConstant";

const initialState = [];

export const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEPARTMENT_READ_SUCCESS:
      return action.payload;

    case DEPARTMENT_CREATE_SUCCESS:
      return [...state, action.payload];

    case DEPARTMENT_UPDATE_SUCCESS:
      return state.map((dept) =>
        dept.id === action.payload.id ? { ...dept, ...action.payload } : dept
      );

    case DEPARTMENT_DELETE_SUCCESS:
      return state.filter((dept) => dept.id !== action.payload);

    default:
      return state;
  }
};