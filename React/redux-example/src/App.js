import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./actions";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Redux Counter</h3>
        <h1 className="display-4 text-center">{counter}</h1>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-success w-100 me-2" onClick={() => dispatch(increment())}>
            Increase
          </button>
          <button className="btn btn-secondary w-100 mx-2" onClick={() => dispatch(reset())}>
            Reset
          </button>
          <button className="btn btn-danger w-100 ms-2" onClick={() => dispatch(decrement())}>
            Decrease
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
