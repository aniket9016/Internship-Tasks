import React from 'react';

class Counter extends React.Component {
  static MAX = 10;

  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () =>
    this.setState(({ count }) => ({
      count: Math.min(count + 1, Counter.MAX),
    }));

  decrement = () =>
    this.setState(({ count }) => ({
      count: Math.max(count - 1, 0),
    }));

  reset = () => this.setState({ count: 0 });

  render() {
    const { count } = this.state;
    const pct = (count / Counter.MAX) * 100;

    return (
      <div className="counter-component container d-flex justify-content-center mt-5">
        <div className="card text-center shadow p-4" style={{ width: '300px' }}>
          <div className="card-header">
            <h3>Counter</h3>
          </div>
          <div className="card-body">
            <h4 className="mb-3">
              Count:{' '}
              <span key={count} className="count count-animate">
                {count}
              </span>
            </h4>

            <div className="d-flex justify-content-around mb-3">
              <button
                className="btn btn-light px-4"
                onClick={this.decrement}
                disabled={count === 0}
              >
                –
              </button>
              <button
                className="btn btn-light px-4"
                onClick={this.increment}
                disabled={count === Counter.MAX}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-warning btn-sm mb-3"
              onClick={this.reset}
              disabled={count === 0}
            >
              Reset
            </button>

            <div className="progress">
              <div
                className="progress-bar bg-light"
                role="progressbar"
                style={{ width: `${pct}%` }}
                aria-valuenow={count}
                aria-valuemin="0"
                aria-valuemax={Counter.MAX}
              />
            </div>
            <small className="text-muted">
              {count} / {Counter.MAX}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;