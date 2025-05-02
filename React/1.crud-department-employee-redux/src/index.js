import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import combineReducers from "./reducers";
import { thunk } from "redux-thunk";

const store = createStore(combineReducers,applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
