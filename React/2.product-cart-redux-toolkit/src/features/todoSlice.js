// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [],
// };

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push(action.payload);
//     },
//     toggleTodo: (state, action) => {
//       const { id } = action.payload;
//       const todo = state.todos.find((todo) => todo.id === id);
//       if (todo) {
//         todo.completed = !todo.completed;
//       }
//     },
//   },
// });

// export const { addTodo, toggleTodo } = todoSlice.actions;
// export default todoSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      });
    },
    toggleComplete: (state, action) => {
      const index = action.payload;
      state[index].completed = !state[index].completed;
    },
    deleteTodo: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
