import React from 'react'
import { useState } from 'react';

const PropAndState = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <div className='text-center'>
                <p>You clicked {count} times</p>
                <button className='btn btn-success' onClick={() => setCount(count + 1)}>
                    Click me
                </button>
                <Welcome name="John" />
            </div>
        </>
    )
}
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}


export default PropAndState