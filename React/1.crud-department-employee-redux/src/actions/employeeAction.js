import axios from "axios";
import {
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_READ_SUCCESS,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from "./actionConstant";
import { variables } from "../components/url_constant";

export const readEmployee = () => async (dispatch) => {
  try {
    const res = await axios.get(`${variables.BASE_URL}${variables.API_V}${variables.GET_ALL_EMPLOYEE}`);
    if (res.status === 200) {
      dispatch({ type: EMPLOYEE_READ_SUCCESS, payload: res.data });
    }
  } catch (err) {}
};

export const createEmployee = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${variables.BASE_URL}${variables.API_V}${variables.POST_EMPLOYEE}`,
      formData,
      { headers: { Accept: "application/json" } }
    );
    if (res.status === 201) {
      dispatch({ type: EMPLOYEE_CREATE_SUCCESS, payload: res.data });
    }
  } catch (err) {}
};

export const updateEmployee = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${variables.BASE_URL}${variables.API_V}${variables.PUT_EMPLOYEE}/${id}`,
      formData,
      { headers: { Accept: "application/json" } }
    );
    if (res.status === 200) {
      dispatch({ type: EMPLOYEE_UPDATE_SUCCESS, payload: res.data });
    }
  } catch (err) {}
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${variables.BASE_URL}${variables.API_V}${variables.DELETE_EMPLOYEE}/${id}`);
    if (res.status === 200) {
      dispatch({ type: EMPLOYEE_DELETE_SUCCESS, payload: id });
    }
  } catch (err) {}
};
