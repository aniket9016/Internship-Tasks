import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import todoReducer from "../features/todoSlice";
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import studentReducer from "../features/studentSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    products: productReducer,
    cart: cartReducer,
    student: studentReducer,
  },
});
