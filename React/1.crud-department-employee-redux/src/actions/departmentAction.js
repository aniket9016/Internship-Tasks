import axios from "axios";
import {
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_READ_SUCCESS,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_DELETE_SUCCESS,
} from "./actionConstant";
import { variables } from "../components/url_constant";

export const readDepartment = () => async (dispatch) => {
  try {
    const res = await axios.get(
      variables.BASE_URL + variables.API_V + variables.GET_ALL_DEPARTMENT
    );
    if (res.status === 200) {
      dispatch({
        type: DEPARTMENT_READ_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.error("Failed to fetch departments", error);
  }
};

export const createDepartment = (department) => async (dispatch) => {
  try {
    const res = await axios.post(
      variables.BASE_URL + variables.API_V + variables.POST_DEPARTMENT,
      department,
      { headers: variables.postHeader }
    );
    if (res.status === 201) {
      dispatch({
        type: DEPARTMENT_CREATE_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.error("Failed to create department", error);
  }
};

export const updateDepartment = (id, department) => async (dispatch) => {
  try {
    const res = await axios.put(
      variables.BASE_URL +
        variables.API_V +
        variables.PUT_DEPARTMENT +
        `/${id}`,
      department,
      { headers: variables.postHeader }
    );
    if (res.status === 200) {
      dispatch({
        type: DEPARTMENT_UPDATE_SUCCESS,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.error("Failed to update department", error);
  }
};

export const deleteDepartment = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      variables.BASE_URL +
        variables.API_V +
        variables.DELETE_DEPARTMENT +
        `/${id}`
    );
    if (res.status === 200) {
      dispatch({
        type: DEPARTMENT_DELETE_SUCCESS,
        payload: id,
      });
    }
  } catch (error) {
    console.error("Failed to delete department", error);
  }
};
