import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../features/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="container d-flex justify-content-center">
      <div
        className="card text-center p-4 shadow"
        style={{ minWidth: "300px" }}
      >
        <h4 className="mb-4">Redux Counter</h4>
        <div className="d-flex justify-content-around align-items-center mb-3">
          <button
            className="btn btn-success"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <span className="fs-3">{count}</span>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(decrement())}
            disabled={count === 0}
          >
            -
          </button>
        </div>
        <button
          className="btn btn-secondary mt-2"
          onClick={() => dispatch(reset())}
          disabled={count === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
