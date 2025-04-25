import React from 'react';
import ReactDOM from 'react-dom/client';
import PropAndState from './Components/PropAndState';
import App from './App';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hello: "World!" };
    }

    componentWillMount() {
        console.log("componentWillMount()");
    }

    componentDidMount() {
        console.log("componentDidMount()");
    }

    changeState() {
        this.setState({ hello: "Geek!" });
    }

    render() {
        return (
            <>
                <div className='text-center'>
                    <h1>GeeksForGeeks.org, Hello {this.state.hello}</h1>
                    <h2>
                        <button className='btn btn-sm btn-danger' onClick={this.changeState.bind(this)}>
                            Press Here!
                        </button>
                    </h2>
                </div>
                <PropAndState />
                <App/>
            </>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate()");
        return true;
    }

    componentWillUpdate() {
        console.log("componentWillUpdate()");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate()");
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Test />);

