import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://localhost:7248/api/Student";

export const fetchStudents = createAsyncThunk("student/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

export const addStudent = createAsyncThunk("student/add", async (student) => {
  const res = await axios.post(API_URL, student);
  return res.data;
});

export const updateStudent = createAsyncThunk(
  "student/update",
  async (student) => {
    const res = await axios.put(`${API_URL}/${student.id}`, student);
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk("student/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const i = state.students.findIndex((s) => s.id === action.payload.id);
        if (i !== -1) state.students[i] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
