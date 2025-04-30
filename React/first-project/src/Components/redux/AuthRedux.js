import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./actions/authActions";

function AuthRedux() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="text-end">
      {user ? (
        <button onClick={() => dispatch(logout())} className="btn btn-danger">
          Logout
        </button>
      ) : (
        <button onClick={() => dispatch(login())} className="btn btn-success">
          Login
        </button>
      )}
      {user && (
        <h1 className="mb-3 text-center text-success">
          <b>You are logged in</b>
        </h1>
      )}
      {!user && (
        <h1 className="mb-3 text-center text-danger">
          <b>You are logged out</b>
        </h1>
      )}
    </div>
  );
}

export default AuthRedux;
